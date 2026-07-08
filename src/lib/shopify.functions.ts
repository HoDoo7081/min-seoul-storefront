import { createServerFn } from "@tanstack/react-start";
import { mapShopifyToProduct } from "./shopify";
import type { Product } from "./types";

const SHOPIFY_API_VERSION = "2025-07";
const SHOPIFY_STORE_PERMANENT_DOMAIN = "txkvi0-1n.myshopify.com";
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = "9e821c0a004228abf136286638037b74";

const ALLOWED_COUNTRIES = ["KR", "US", "TW", "CN", "TH"] as const;
type Country = (typeof ALLOWED_COUNTRIES)[number];

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!, $country: CountryCode!)
  @inContext(country: $country) {
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

export const getProductByHandle = createServerFn({ method: "GET" })
  .inputValidator((input: { handle: string; country?: string }) => input)
  .handler(async ({ data }): Promise<Product | null> => {
    const country: Country = (ALLOWED_COUNTRIES as readonly string[]).includes(
      data.country ?? "",
    )
      ? (data.country as Country)
      : "US";

    const response = await fetch(SHOPIFY_STOREFRONT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: PRODUCT_BY_HANDLE_QUERY,
        variables: { handle: data.handle, country },
      }),
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.status}`);
    }

    const json = await response.json();
    if (json.errors) {
      throw new Error(
        `Shopify error: ${json.errors.map((e: { message: string }) => e.message).join(", ")}`
      );
    }

    const productData = json.data?.productByHandle;
    if (!productData) return null;

    return mapShopifyToProduct(productData);
  });
