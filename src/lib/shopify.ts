// Shopify Storefront API client
import { toast } from "sonner";
import type { Product, ProductImage, ProductVariant } from "@/lib/types";

const SHOPIFY_PROXY_URL = "/api/shopify";
const SHOPIFY_CHECKOUT_DOMAIN = "txkvi0-1n.myshopify.com";

export function createCheckoutWindow(): Window | null {
  return null;
}

export function openCheckoutUrl(url: string, checkoutWindow?: Window | null) {
  if (typeof window === "undefined") return;
  checkoutWindow?.close();

  // window.location은 Lovable 내부 라우터가 가로챔
  // <a> 태그를 동적으로 생성해서 강제로 외부 이동
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
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart { id checkoutUrl }
      userErrors { message }
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
    price: (() => {
      const raw = parseFloat(e.node.price.amount);
      const code = e.node.price.currencyCode;
      // Shopify에서 USD로 오면 KRW로 환산, 이미 KRW면 그대로
      return code === "KRW" ? Math.round(raw) : Math.round(raw * 1380);
    })(),
    available: e.node.availableForSale,
    image: e.node.image
      ? { url: e.node.image.url, altText: e.node.image.altText ?? e.node.title }
      : undefined,
  }));
}

export function mapShopifyToProduct(node: ShopifyProductNode): Product {
  const brandHandle = (node.vendor || "pureveseoul")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents (é → e)
    .replace(/\s+/g, "-");
  return {
    id: node.id,
    handle: node.handle,
    title:
      node.handle === "the-clinic-barrier-line" && !node.title.includes("(Set of 2)")
        ? `${node.title} (Set of 2)`
        : node.title,
    vendor: node.vendor || "Purève Seoul",
    brandHandle,
    price: (() => {
      const raw = parseFloat(node.priceRange.minVariantPrice.amount);
      const code = node.priceRange.minVariantPrice.currencyCode;
      return code === "KRW" ? Math.round(raw) : Math.round(raw * 1380);
    })(),
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

export async function createShopifyCheckout(
  lines: Array<{ merchandiseId: string; quantity: number }>,
): Promise<string | null> {
  const data = await storefrontApiRequest<{
    cartCreate: {
      cart: { id: string; checkoutUrl: string } | null;
      userErrors: Array<{ message: string }>;
    };
  }>(CART_CREATE_MUTATION, { lines });
  if (!data || !data.cartCreate.cart) {
    const msg = data?.cartCreate.userErrors?.[0]?.message ?? "Failed to create checkout";
    toast.error(msg);
    return null;
  }

  const raw = data.cartCreate.cart.checkoutUrl;
  console.log("[Raw checkoutUrl from Shopify]", raw);

  // URL 파싱 없이 정규식으로 도메인 교체
  // pureveseoul.com → txkvi0-1n.myshopify.com
  const fixed = raw.replace(
    /^https?:\/\/(?:www\.)?pureveseoul\.com/i,
    "https://txkvi0-1n.myshopify.com"
  );
  console.log("[Fixed checkoutUrl]", fixed);

  // return_url 파라미터 추가
  const hasQuery = fixed.includes("?");
  const withReturn = fixed + (hasQuery ? "&" : "?") + "return_url=" + encodeURIComponent("https://pureveseoul.com");

  // 인플루언서 할인코드
  const discountCode = typeof window !== "undefined"
    ? sessionStorage.getItem("utm_discount")
    : null;

  const final = discountCode
    ? withReturn + "&discount=" + encodeURIComponent(discountCode)
    : withReturn;

  console.log("[Final checkoutUrl]", final);

  return final;
}

