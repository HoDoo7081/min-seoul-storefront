import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const SHOPIFY_API_VERSION = "2024-10";
const SHOPIFY_STORE_DOMAIN = "txkvi0-1n.myshopify.com";

export interface OrderSummary {
  id: number;
  orderNumber: string;
  createdAt: string;
  financialStatus: string | null;
  fulfillmentStatus: string | null;
  totalPrice: string;
  currency: string;
  lineItems: Array<{ title: string; quantity: number }>;
  statusUrl: string | null;
}

export const getMyOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ orders: OrderSummary[]; error: string | null }> => {
    const email = context.claims?.email as string | undefined;
    if (!email) {
      return { orders: [], error: "No email associated with your account." };
    }

    const token = process.env.SHOPIFY_ACCESS_TOKEN;
    if (!token) {
      return { orders: [], error: "Shopify is not configured." };
    }

    const url = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/orders.json?email=${encodeURIComponent(
      email,
    )}&status=any&limit=50`;

    try {
      const res = await fetch(url, {
        headers: {
          "X-Shopify-Access-Token": token,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("[Shopify Admin API]", res.status, text);
        return { orders: [], error: `Failed to load orders (${res.status})` };
      }

      const json = (await res.json()) as {
        orders: Array<{
          id: number;
          name: string;
          created_at: string;
          financial_status: string | null;
          fulfillment_status: string | null;
          total_price: string;
          currency: string;
          order_status_url: string | null;
          line_items: Array<{ title: string; quantity: number }>;
        }>;
      };

      return {
        orders: json.orders.map((o) => ({
          id: o.id,
          orderNumber: o.name,
          createdAt: o.created_at,
          financialStatus: o.financial_status,
          fulfillmentStatus: o.fulfillment_status,
          totalPrice: o.total_price,
          currency: o.currency,
          lineItems: o.line_items.map((li) => ({ title: li.title, quantity: li.quantity })),
          statusUrl: o.order_status_url,
        })),
        error: null,
      };
    } catch (err) {
      console.error("[getMyOrders]", err);
      return { orders: [], error: "Could not reach Shopify." };
    }
  });

export interface OrderDetail {
  id: number;
  orderNumber: string;
  createdAt: string;
  financialStatus: string | null;
  fulfillmentStatus: string | null;
  totalPrice: string;
  subtotalPrice: string | null;
  totalShipping: string | null;
  totalTax: string | null;
  currency: string;
  statusUrl: string | null;
  shippingAddress: {
    name: string | null;
    address1: string | null;
    address2: string | null;
    city: string | null;
    zip: string | null;
    country: string | null;
    phone: string | null;
  } | null;
  lineItems: Array<{
    title: string;
    variantTitle: string | null;
    quantity: number;
    price: string;
    image: string | null;
  }>;
}

export const getMyOrder = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data, context }): Promise<{ order: OrderDetail | null; error: string | null }> => {
    const email = context.claims?.email as string | undefined;
    if (!email) return { order: null, error: "No email associated with your account." };

    const token = process.env.SHOPIFY_ACCESS_TOKEN;
    if (!token) return { order: null, error: "Shopify is not configured." };

    const url = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/orders/${encodeURIComponent(
      data.id,
    )}.json`;

    try {
      const res = await fetch(url, {
        headers: { "X-Shopify-Access-Token": token, "Content-Type": "application/json" },
      });
      if (!res.ok) {
        return { order: null, error: `Failed to load order (${res.status})` };
      }
      const json = (await res.json()) as {
        order: {
          id: number;
          name: string;
          email: string | null;
          created_at: string;
          financial_status: string | null;
          fulfillment_status: string | null;
          total_price: string;
          subtotal_price: string | null;
          total_shipping_price_set?: { shop_money?: { amount: string } };
          total_tax: string | null;
          currency: string;
          order_status_url: string | null;
          shipping_address: {
            name?: string;
            address1?: string;
            address2?: string;
            city?: string;
            zip?: string;
            country?: string;
            phone?: string;
          } | null;
          line_items: Array<{
            title: string;
            variant_title: string | null;
            quantity: number;
            price: string;
          }>;
        };
      };
      const o = json.order;

      // Ownership check by email
      if ((o.email ?? "").toLowerCase() !== email.toLowerCase()) {
        return { order: null, error: "Order not found." };
      }

      return {
        order: {
          id: o.id,
          orderNumber: o.name,
          createdAt: o.created_at,
          financialStatus: o.financial_status,
          fulfillmentStatus: o.fulfillment_status,
          totalPrice: o.total_price,
          subtotalPrice: o.subtotal_price,
          totalShipping: o.total_shipping_price_set?.shop_money?.amount ?? null,
          totalTax: o.total_tax,
          currency: o.currency,
          statusUrl: o.order_status_url,
          shippingAddress: o.shipping_address
            ? {
                name: o.shipping_address.name ?? null,
                address1: o.shipping_address.address1 ?? null,
                address2: o.shipping_address.address2 ?? null,
                city: o.shipping_address.city ?? null,
                zip: o.shipping_address.zip ?? null,
                country: o.shipping_address.country ?? null,
                phone: o.shipping_address.phone ?? null,
              }
            : null,
          lineItems: o.line_items.map((li) => ({
            title: li.title,
            variantTitle: li.variant_title,
            quantity: li.quantity,
            price: li.price,
            image: null,
          })),
        },
        error: null,
      };
    } catch (err) {
      console.error("[getMyOrder]", err);
      return { order: null, error: "Could not reach Shopify." };
    }
  });
