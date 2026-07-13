// Shopify Storefront API client
import { toast } from "sonner";
import type { Product, ProductImage, ProductVariant } from "@/lib/types";

const SHOPIFY_PROXY_URL = "/api/shopify";

// Shop base currency is USD. All Shopify prices arrive as USD.
// We normalize to KRW internally, then formatPrice() converts to display currency
// using the reciprocal rates defined in useLocale (CURRENCIES).
// KRW/USD rate is calibrated so that Shopify USD prices map back to the target KRW prices
// (e.g. $59.68 × 1508 ≈ ₩90,000).
const KRW_PER_USD = 1508;

const SHOPIFY_TO_KRW_RATE: Record<string, number> = {
  KRW: 1,
  USD: KRW_PER_USD,
  TWD: KRW_PER_USD / 32.09, // ≈ 47
  CNY: KRW_PER_USD / 7.15,  // ≈ 211
  THB: KRW_PER_USD / 34,    // ≈ 44
};

function normalizeShopifyAmountToKrw(amount: string, currencyCode: string): number {
  const raw = parseFloat(amount);
  if (!Number.isFinite(raw)) return 0;
  const rate = SHOPIFY_TO_KRW_RATE[currencyCode] ?? SHOPIFY_TO_KRW_RATE.USD;
  return Math.round(raw * rate);
}

export function createCheckoutWindow(): Window | null {
  if (typeof window === "undefined") return null;

  const checkoutWindow = window.open("about:blank", "_blank");
  if (checkoutWindow) {
    checkoutWindow.opener = null;
  }
  return checkoutWindow;
}

export function openCheckoutUrl(url: string, checkoutWindow?: Window | null) {
  if (typeof window === "undefined") return;

  checkoutWindow?.close();

  const a = document.createElement("a");
  a.href = url;
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export class ShopifyPaymentRequiredError extends Error {
  code = "PAYMENT_REQUIRED" as const;
  constructor() {
    super("Shopify Storefront API returned 402 Payment Required");
    this.name = "ShopifyPaymentRequiredError";
  }
}

export async function checkShopifyHealth(): Promise<
  { ok: true } | { ok: false; code: "PAYMENT_REQUIRED" | "ERROR"; status?: number }
> {
  try {
    const res = await fetch(SHOPIFY_PROXY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: "{ shop { name } }" }),
    });
    if (res.status === 402) return { ok: false, code: "PAYMENT_REQUIRED", status: 402 };
    if (!res.ok) return { ok: false, code: "ERROR", status: res.status };
    return { ok: true };
  } catch {
    return { ok: false, code: "ERROR" };
  }
}

export interface ShopifyProductNode {
  id: string;
  title: string;
  description: string;
  handle: string;
  vendor: string;
  productType: string;
  tags: string[];
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { edges: Array<{ node: { url: string; altText: string | null } }> };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: { amount: string; currencyCode: string };
        availableForSale: boolean;
        image?: { url: string; altText: string | null } | null;
        selectedOptions: Array<{ name: string; value: string }>;
      };
    }>;
  };
  options: Array<{ name: string; values: string[] }>;
}

const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          vendor
          productType
          tags
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 8) { edges { node { url altText } } }
          variants(first: 20) {
            edges {
              node {
                id
                title
                price { amount currencyCode }
                availableForSale
                image { url altText }
                selectedOptions { name value }
              }
            }
          }
          options { name values }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      vendor
      productType
      tags
      priceRange { minVariantPrice { amount currencyCode } }
      images(first: 8) { edges { node { url altText } } }
      variants(first: 20) {
        edges {
          node {
            id
            title
            price { amount currencyCode }
            availableForSale
            image { url altText }
            selectedOptions { name value }
          }
        }
      }
      options { name values }
    }
  }
`;

const CART_CREATE_MUTATION = `
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart { id checkoutUrl }
      userErrors { field message }
    }
  }
`;

async function storefrontApiRequest<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T | undefined> {
  const response = await fetch(SHOPIFY_PROXY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    throw new ShopifyPaymentRequiredError();
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  if (data.errors) {
    throw new Error(
      `Shopify error: ${data.errors.map((e: { message: string }) => e.message).join(", ")}`,
    );
  }
  return data.data as T;
}

// ───── Mappers ─────
function mapImages(node: ShopifyProductNode): ProductImage[] {
  return node.images.edges.map((e) => ({
    url: e.node.url,
    altText: e.node.altText ?? node.title,
  }));
}

function mapVariants(node: ShopifyProductNode): ProductVariant[] {
  return node.variants.edges.map((e) => ({
    id: e.node.id,
    title: e.node.title,
    price: normalizeShopifyAmountToKrw(e.node.price.amount, e.node.price.currencyCode),
    available: e.node.availableForSale,
    image: e.node.image
      ? { url: e.node.image.url, altText: e.node.image.altText ?? e.node.title }
      : undefined,
  }));
}

export function mapShopifyToProduct(node: ShopifyProductNode): Product {
  const brandHandle = (node.vendor || "minseoul")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
  return {
    id: node.id,
    handle: node.handle,
    title:
      node.handle === "the-clinic-barrier-line" && !node.title.includes("(Set of 2)")
        ? `${node.title} (Set of 2)`
        : node.title,
    vendor: node.vendor || "Min Seoul",
    brandHandle,
    price: normalizeShopifyAmountToKrw(
      node.priceRange.minVariantPrice.amount,
      node.priceRange.minVariantPrice.currencyCode,
    ),
    description: node.description,
    shortDescription: node.description.slice(0, 140),
    images: mapImages(node),
    variants: mapVariants(node),
    options: node.options.map((o) => ({ name: o.name, values: o.values })),
    tags: node.tags ?? [],
    isNew: (node.tags ?? []).some((t) => t.toLowerCase() === "new"),
    isBestSeller: (node.tags ?? []).some((t) => /best/i.test(t)),
    rating: 0,
    reviewCount: 0,
  };
}

// ───── Public API ─────
export async function fetchProducts(query?: string): Promise<Product[]> {
  const data = await storefrontApiRequest<{
    products: { edges: Array<{ node: ShopifyProductNode }> };
  }>(PRODUCTS_QUERY, { first: 50, query: query ?? null });
  if (!data) return [];
  return data.products.edges.map((e) => mapShopifyToProduct(e.node));
}

export async function fetchProductByHandle(handle: string): Promise<Product | null> {
  const data = await storefrontApiRequest<{ productByHandle: ShopifyProductNode | null }>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle },
  );
  if (!data || !data.productByHandle) return null;
  return mapShopifyToProduct(data.productByHandle);
}

export type CheckoutBuyer = {
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  postalCode?: string | null;
  country?: string | null;
  taiwanEzWayId?: string | null;
};

function isTaiwanCountry(v?: string | null): boolean {
  if (!v) return false;
  return /taiwan|台灣|台湾|^tw$/i.test(v.trim());
}

// Map user-entered country strings to Shopify CountryCode enum (ISO 3166-1 alpha-2).
// Shopify Cart API rejects full country names like "South Korea" or "Taiwan".
const COUNTRY_ALIASES: Record<string, string> = {
  "south korea": "KR", "korea": "KR", "republic of korea": "KR",
  "대한민국": "KR", "한국": "KR", "kr": "KR",
  "taiwan": "TW", "台灣": "TW", "台湾": "TW", "tw": "TW",
  "china": "CN", "中国": "CN", "中國": "CN", "cn": "CN",
  "hong kong": "HK", "香港": "HK", "hk": "HK",
  "japan": "JP", "日本": "JP", "jp": "JP",
  "united states": "US", "usa": "US", "us": "US", "america": "US",
  "united kingdom": "GB", "uk": "GB", "gb": "GB", "britain": "GB",
  "thailand": "TH", "th": "TH",
  "singapore": "SG", "sg": "SG",
  "malaysia": "MY", "my": "MY",
  "vietnam": "VN", "vn": "VN",
  "philippines": "PH", "ph": "PH",
  "indonesia": "ID", "id": "ID",
  "australia": "AU", "au": "AU",
  "canada": "CA", "ca": "CA",
};

function toCountryCode(v?: string | null): string | undefined {
  if (!v) return undefined;
  const key = v.trim().toLowerCase();
  if (COUNTRY_ALIASES[key]) return COUNTRY_ALIASES[key];
  // Already a 2-letter code
  if (/^[A-Za-z]{2}$/.test(v.trim())) return v.trim().toUpperCase();
  return undefined;
}

export async function createShopifyCheckout(
  lines: Array<{ merchandiseId: string; quantity: number }>,
  buyer?: CheckoutBuyer,
): Promise<string | null> {
  const isTW = isTaiwanCountry(buyer?.country);
  const ezWay = (buyer?.taiwanEzWayId ?? "").trim();
  const countryCode = toCountryCode(buyer?.country);

  const hasAddress = !!(
    buyer?.address1 || buyer?.city || buyer?.postalCode || countryCode
  );
  const hasNameOrAddress = !!(buyer?.firstName || buyer?.lastName || hasAddress);

  const deliveryAddress: Record<string, string> | undefined = hasNameOrAddress
    ? {
        ...(buyer?.firstName ? { firstName: buyer.firstName } : {}),
        ...(buyer?.lastName ? { lastName: buyer.lastName } : {}),
        ...(buyer?.phone ? { phone: buyer.phone } : {}),
        ...(buyer?.address1 ? { address1: buyer.address1 } : {}),
        ...(buyer?.address2 ? { address2: buyer.address2 } : {}),
        ...(buyer?.city ? { city: buyer.city } : {}),
        ...(buyer?.postalCode ? { zip: buyer.postalCode } : {}),
        ...(countryCode ? { countryCode } : {}),
      }
    : undefined;

  const buyerIdentity: Record<string, unknown> = {};
  if (buyer?.email) buyerIdentity.email = buyer.email;
  if (buyer?.phone) buyerIdentity.phone = buyer.phone;
  if (countryCode) buyerIdentity.countryCode = countryCode;
  if (deliveryAddress) {
    buyerIdentity.deliveryAddressPreferences = [{ deliveryAddress }];
  }

  // Custom cart attributes — visible in Shopify Admin order details.
  const attributes: Array<{ key: string; value: string }> = [];
  if (isTW && ezWay) {
    attributes.push({ key: "Taiwan EZ Way ID", value: ezWay });
    attributes.push({ key: "身分證字號", value: ezWay });
  }

  // Discount code (influencer / UTM). 30-day cookie takes precedence over sessionStorage.
  let discountCode: string | null = null;
  if (typeof window !== "undefined") {
    const cookieMatch = document.cookie.match(/(?:^|; )utm_discount=([^;]*)/);
    discountCode = cookieMatch
      ? decodeURIComponent(cookieMatch[1])
      : sessionStorage.getItem("utm_discount");
  }

  const noteLines: string[] = [];
  if (isTW && ezWay) noteLines.push(`Taiwan EZ Way / 身分證字號: ${ezWay}`);

  const input: Record<string, unknown> = { lines };
  if (Object.keys(buyerIdentity).length) input.buyerIdentity = buyerIdentity;
  if (attributes.length) input.attributes = attributes;
  if (noteLines.length) input.note = noteLines.join(" | ");
  if (discountCode) input.discountCodes = [discountCode];

  const data = await storefrontApiRequest<{
    cartCreate: {
      cart: { id: string; checkoutUrl: string } | null;
      userErrors: Array<{ field?: string[] | null; message: string }>;
    };
  }>(CART_CREATE_MUTATION, { input });

  if (!data || !data.cartCreate.cart) {
    const err = data?.cartCreate.userErrors?.[0];
    const msg = err?.message ?? "Failed to create checkout";
    console.error("[cartCreate userErrors]", data?.cartCreate.userErrors);
    toast.error(msg);
    return null;
  }

  console.log("[Checkout URL]", data.cartCreate.cart.checkoutUrl);
  return data.cartCreate.cart.checkoutUrl;
}
