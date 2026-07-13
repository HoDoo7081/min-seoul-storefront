import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const SHOPIFY_API_VERSION = "2025-01";
const SHOPIFY_STORE_DOMAIN = "txkvi0-1n.myshopify.com";

type ShopifyAddress = {
  first_name?: string;
  last_name?: string;
  address1?: string;
  address2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
};

type ShopifyCustomerInput = {
  first_name?: string;
  last_name?: string;
  email: string;
  phone?: string;
  addresses?: ShopifyAddress[];
  note?: string;
  tags?: string;
};

// Token cache (per-worker instance)
let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAdminToken(): Promise<string | null> {
  const clientId = process.env.SHOPIFY_CLIENT_ID;
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.value;
  }

  const res = await fetch(
    `https://${SHOPIFY_STORE_DOMAIN}/admin/oauth/access_token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
    },
  );

  if (!res.ok) {
    console.error("[Shopify token]", res.status, await res.text());
    return null;
  }

  const { access_token, expires_in } = (await res.json()) as {
    access_token: string;
    expires_in: number;
  };
  cachedToken = { value: access_token, expiresAt: Date.now() + expires_in * 1000 };
  return access_token;
}

async function shopifyAdmin<T>(
  path: string,
  method: "GET" | "POST" | "PUT",
  token: string,
  body?: unknown,
): Promise<{ ok: boolean; status: number; data?: T; text?: string }> {
  const res = await fetch(
    `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}${path}`,
    {
      method,
      headers: {
        "X-Shopify-Access-Token": token,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    },
  );
  if (!res.ok) {
    const text = await res.text();
    return { ok: false, status: res.status, text };
  }
  const data = (await res.json()) as T;
  return { ok: true, status: res.status, data };
}

export const syncShopifyCustomer = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ ok: boolean; error?: string; customerId?: number }> => {
    const token = await getAdminToken();
    if (!token) return { ok: false, error: "Shopify not configured" };

    const email = context.claims?.email as string | undefined;
    if (!email) return { ok: false, error: "No email on account" };

    const { supabase, userId } = context;

    const { data: profile, error: profileErr } = await supabase
      .from("profiles")
      .select(
        "full_name, phone, shipping_address_line1, shipping_address_line2, shipping_city, shipping_postal_code, shipping_country, shopify_customer_id, taiwan_ez_way_id",
      )
      .eq("id", userId)
      .maybeSingle();

    if (profileErr || !profile) {
      return { ok: false, error: "Profile not found" };
    }

    const fullName = (profile.full_name ?? "").trim();
    const [firstName, ...rest] = fullName.split(" ");
    const lastName = rest.join(" ");

    const country = (profile.shipping_country ?? "").trim();
    const isTaiwan = /taiwan|台灣|台湾|^tw$/i.test(country);
    const ezWay = (profile.taiwan_ez_way_id ?? "").trim();

    // For Taiwan customers, inject EZ Way customs ID into address2 so it
    // reaches Shopify orders and the carrier customs paperwork.
    const address2Value = isTaiwan && ezWay
      ? `EZWAY: ${ezWay}${profile.shipping_address_line2 ? ` / ${profile.shipping_address_line2}` : ""}`
      : profile.shipping_address_line2 ?? undefined;

    const address: ShopifyAddress | null = profile.shipping_address_line1
      ? {
          first_name: firstName || undefined,
          last_name: lastName || undefined,
          address1: profile.shipping_address_line1 ?? undefined,
          address2: address2Value || undefined,
          city: profile.shipping_city ?? undefined,
          zip: profile.shipping_postal_code ?? undefined,
          country: country || undefined,
          phone: profile.phone ?? undefined,
        }
      : null;

    const noteParts: string[] = [];
    if (isTaiwan && ezWay) noteParts.push(`Taiwan EZ Way ID: ${ezWay}`);

    const customerPayload: ShopifyCustomerInput = {
      email,
      first_name: firstName || undefined,
      last_name: lastName || undefined,
      phone: profile.phone ?? undefined,
      addresses: address ? [address] : undefined,
      note: noteParts.length ? noteParts.join(" | ") : undefined,
      tags: isTaiwan ? "taiwan,ezway" : undefined,
    };

    let customerId = profile.shopify_customer_id as number | null;

    if (!customerId) {
      const search = await shopifyAdmin<{ customers: Array<{ id: number }> }>(
        `/customers/search.json?query=${encodeURIComponent(`email:${email}`)}`,
        "GET",
        token,
      );
      if (search.ok && search.data?.customers?.[0]?.id) {
        customerId = search.data.customers[0].id;
      }
    }

    if (customerId) {
      const update = await shopifyAdmin<{ customer: { id: number } }>(
        `/customers/${customerId}.json`,
        "PUT",
        token,
        { customer: { id: customerId, ...customerPayload } },
      );
      if (!update.ok) {
        console.error("[Shopify update customer]", update.status, update.text);
        return { ok: false, error: `Update failed (${update.status})` };
      }
    } else {
      const create = await shopifyAdmin<{ customer: { id: number } }>(
        `/customers.json`,
        "POST",
        token,
        { customer: customerPayload },
      );
      if (!create.ok || !create.data?.customer?.id) {
        console.error("[Shopify create customer]", create.status, create.text);
        return { ok: false, error: `Create failed (${create.status})` };
      }
      customerId = create.data.customer.id;
    }

    await supabase
      .from("profiles")
      .update({ shopify_customer_id: customerId })
      .eq("id", userId);

    return { ok: true, customerId };
  });
