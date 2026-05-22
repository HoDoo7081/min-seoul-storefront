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
