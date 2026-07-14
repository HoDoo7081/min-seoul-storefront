import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getMyOrder } from "@/lib/orders.functions";

export const Route = createFileRoute("/account/orders/$id")({
  component: OrderDetailPage,
  head: () => ({
    meta: [
      { title: "Order Details — Min Seoul" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function OrderDetailPage() {
  const { id } = Route.useParams();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const fetchOrder = useServerFn(getMyOrder);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/account/login" });
  }, [user, loading, navigate]);

  const { data, isLoading } = useQuery({
    queryKey: ["my-order", id, user?.id],
    queryFn: () => fetchOrder({ data: { id } }),
    enabled: !!user,
  });

  if (loading || isLoading) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-[900px] items-center justify-center px-5 py-14">
        <p className="text-[13px] text-muted-foreground">Loading…</p>
      </section>
    );
  }

  if (!user) return null;

  const order = data?.order;
  const error = data?.error;

  if (!order) {
    return (
      <section className="mx-auto max-w-[900px] px-5 py-14 md:px-10 md:py-20">
        <Link
          to="/account/dashboard"
          className="text-[12px] uppercase tracking-widest text-muted-foreground underline hover:text-foreground"
        >
          ← Back to account
        </Link>
        <h1 className="mt-6 font-heading text-[32px] tracking-tight">Order not found</h1>
        <p className="mt-2 text-[13.5px] text-muted-foreground">
          {error ?? "We couldn't find this order on your account."}
        </p>
      </section>
    );
  }

  const created = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const addr = order.shippingAddress;

  return (
    <section className="mx-auto max-w-[900px] px-5 py-14 md:px-10 md:py-20">
      <Link
        to="/account/dashboard"
        className="text-[12px] uppercase tracking-widest text-muted-foreground underline hover:text-foreground"
      >
        ← Back to account
      </Link>

      <div className="mt-6 flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="font-heading text-[36px] tracking-tight md:text-[44px]">
          {order.orderNumber}
        </h1>
        <p className="text-[13px] text-muted-foreground">Placed {created}</p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-[11.5px] uppercase tracking-widest">
        <span className="rounded-full border border-border px-3 py-1 text-muted-foreground">
          {order.financialStatus ?? "pending"}
        </span>
        <span className="rounded-full border border-border px-3 py-1 text-muted-foreground">
          {order.fulfillmentStatus ?? "unfulfilled"}
        </span>
      </div>

      {order.statusUrl && (
        <a
          href={order.statusUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full border border-foreground px-6 text-[12px] font-medium uppercase tracking-widest transition-colors hover:bg-foreground hover:text-background"
        >
          Track shipment
        </a>
      )}

      {/* Items */}
      <div className="mt-12">
        <h2 className="text-[12px] font-medium uppercase tracking-widest">Items</h2>
        <div className="mt-4 divide-y border-y">
          {order.lineItems.map((li, idx) => (
            <div key={idx} className="flex items-start justify-between gap-4 py-4">
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-medium">{li.title}</p>
                {li.variantTitle && (
                  <p className="mt-0.5 text-[12.5px] text-muted-foreground">{li.variantTitle}</p>
                )}
                <p className="mt-1 text-[12px] text-muted-foreground">Qty {li.quantity}</p>
              </div>
              <p className="text-[14px] tabular-nums">
                {order.currency} {(parseFloat(li.price) * li.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {/* Payment */}
        <div>
          <h2 className="text-[12px] font-medium uppercase tracking-widest">Payment</h2>
          <dl className="mt-4 space-y-2 text-[13.5px]">
            {order.subtotalPrice && (
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="tabular-nums">
                  {order.currency} {parseFloat(order.subtotalPrice).toFixed(2)}
                </dd>
              </div>
            )}
            {order.totalShipping && (
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd className="tabular-nums">
                  {order.currency} {parseFloat(order.totalShipping).toFixed(2)}
                </dd>
              </div>
            )}
            {order.totalTax && parseFloat(order.totalTax) > 0 && (
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Tax</dt>
                <dd className="tabular-nums">
                  {order.currency} {parseFloat(order.totalTax).toFixed(2)}
                </dd>
              </div>
            )}
            <div className="flex justify-between border-t pt-2 text-[15px] font-medium">
              <dt>Total</dt>
              <dd className="tabular-nums">
                {order.currency} {parseFloat(order.totalPrice).toFixed(2)}
              </dd>
            </div>
          </dl>
        </div>

        {/* Shipping address */}
        <div>
          <h2 className="text-[12px] font-medium uppercase tracking-widest">Shipping Address</h2>
          {addr ? (
            <address className="mt-4 not-italic text-[13.5px] leading-relaxed text-foreground">
              {addr.name && <div>{addr.name}</div>}
              {addr.address1 && <div>{addr.address1}</div>}
              {addr.address2 && <div>{addr.address2}</div>}
              {(addr.city || addr.zip) && (
                <div>
                  {addr.city}
                  {addr.city && addr.zip ? " " : ""}
                  {addr.zip}
                </div>
              )}
              {addr.country && <div>{addr.country}</div>}
              {addr.phone && <div className="text-muted-foreground">{addr.phone}</div>}
            </address>
          ) : (
            <p className="mt-4 text-[13.5px] text-muted-foreground">
              No shipping address on file.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
