import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SHOPIFY_API_VERSION = "2025-07";
const SHOPIFY_STORE_DOMAIN = "txkvi0-1n.myshopify.com";

const ShopifyCustomerInput = z.object({
  email: z.string().email(),
  firstName: z.string().trim().max(80).optional().default(""),
  lastName: z.string().trim().max(80).optional().default(""),
});

async function shopifyAdminRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = process.env.SHOPIFY_ACCESS_TOKEN;
  if (!token) throw new Error("Shopify is not configured.");

  const response = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": token,
      ...(init.headers ?? {}),
    },
  });

  const text = await response.text();
  const json = text ? JSON.parse(text) : {};

  if (!response.ok) {
    const message = typeof json?.errors === "string" ? json.errors : "Shopify customer sync failed.";
    throw new Error(message);
  }

  return json as T;
}

export const syncSignupCustomerToShopify = createServerFn({ method: "POST" })
  .inputValidator((input) => ShopifyCustomerInput.parse(input))
  .handler(async ({ data }) => {
    const query = encodeURIComponent(`email:${data.email}`);
    const existing = await shopifyAdminRequest<{ customers?: Array<{ id: number }> }>(
      `/customers/search.json?query=${query}&limit=1`,
      { method: "GET" },
    );

    if (existing.customers?.[0]?.id) {
      return { ok: true, status: "exists" as const };
    }

    await shopifyAdminRequest<{ customer: { id: number } }>("/customers.json", {
      method: "POST",
      body: JSON.stringify({
        customer: {
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
          verified_email: false,
          tags: "Purève Seoul signup",
          accepts_marketing: false,
        },
      }),
    });

    return { ok: true, status: "created" as const };
  });