import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const SHOPIFY_API_VERSION = "2025-07";
const SHOPIFY_STORE_DOMAIN = "txkvi0-1n.myshopify.com";

const ShopifyCustomerInput = z.object({
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
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => ShopifyCustomerInput.parse(input))
  .handler(async ({ data, context }) => {
    const { data: userData, error } = await context.supabase.auth.getUser();
    if (error || !userData.user?.email) throw new Error("Signed-in customer not found.");

    const email = userData.user.email;
    const fullName = String(userData.user.user_metadata?.full_name ?? "").trim();
    const [metadataFirstName = "", ...metadataLastNameParts] = fullName.split(/\s+/);
    const firstName = data.firstName || metadataFirstName;
    const lastName = data.lastName || metadataLastNameParts.join(" ");

    const query = encodeURIComponent(`email:${email}`);
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
          email,
          first_name: firstName,
          last_name: lastName,
          verified_email: true,
          tags: "Min Seoul signup",
          accepts_marketing: false,
        },
      }),
    });

    return { ok: true, status: "created" as const };
  });