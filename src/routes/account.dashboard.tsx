import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { getMyOrders } from "@/lib/orders.functions";

export const Route = createFileRoute("/account/dashboard")({
  component: DashboardPage,
  head: () => ({
    meta: [{ title: "My Account — Min Seoul" }],
  }),
});

function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const fetchOrders = useServerFn(getMyOrders);

  const { data: ordersData, isLoading: ordersLoading } = useQuery({
    queryKey: ["my-orders", user?.id],
    queryFn: () => fetchOrders(),
    enabled: !!user,
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/account/login" });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-[1280px] items-center justify-center px-5 py-14 md:px-10 md:py-20">
        <p className="text-[13px] text-muted-foreground">Loading…</p>
      </section>
    );
  }

  if (!user) return null;

  const fullName = (user.user_metadata?.full_name as string | undefined) ?? "";
  const firstName = fullName.split(" ")[0] || "there";
  const orders = ordersData?.orders ?? [];

  return (
    <section className="mx-auto max-w-[1280px] px-5 py-14 md:px-10 md:py-20">
      <h1 className="font-heading text-[40px] leading-tight tracking-tight md:text-[48px]">
        Hello, {firstName}
      </h1>
      <p className="mt-2 text-[14px] text-muted-foreground">{user.email}</p>

      {/* Quick actions */}
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/account/profile"
          className="inline-flex h-11 items-center justify-center rounded-full border border-foreground px-6 text-[12px] font-medium uppercase tracking-widest text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          Profile & Shipping
        </Link>
        <Link
          to="/account/tracking"
          className="inline-flex h-11 items-center justify-center rounded-full border border-border px-6 text-[12px] font-medium uppercase tracking-widest text-foreground transition-colors hover:border-foreground"
        >
          Track Order
        </Link>
      </div>

      {/* Orders section */}
      <div className="mt-12">
        <h2 className="text-[12px] font-medium uppercase tracking-widest text-foreground">
          Order History
        </h2>

        <div className="mt-6">
          {ordersLoading ? (
            <p className="text-[13.5px] text-muted-foreground">Loading orders…</p>
          ) : orders.length === 0 ? (
            <p className="text-[13.5px] text-muted-foreground">
              You haven't placed any orders yet.
            </p>
          ) : (
            <div className="divide-y border-y">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col gap-2 py-5 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3">
                      <span className="text-[14px] font-medium">{order.orderNumber}</span>
                      <span className="text-[12px] text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="mt-1 text-[12.5px] text-muted-foreground">
                      {order.lineItems
                        .map((li) => `${li.title} × ${li.quantity}`)
                        .join(", ")}
                    </p>
                    <p className="mt-1 text-[11.5px] uppercase tracking-widest text-muted-foreground">
                      {order.financialStatus ?? "—"}
                      {order.fulfillmentStatus
                        ? ` · ${order.fulfillmentStatus}`
                        : " · unfulfilled"}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 md:justify-end">
                    <span className="text-[14px] font-medium">
                      {order.currency} {parseFloat(order.totalPrice).toFixed(2)}
                    </span>
                    {order.statusUrl && (
                      <a
                        href={order.statusUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[12px] uppercase tracking-widest underline hover:text-foreground"
                      >
                        View
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>


      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {/* Account Details */}
        <div>
          <h2 className="text-[12px] font-medium uppercase tracking-widest text-foreground">
            Account Details
          </h2>
          <p className="mt-4 text-[13.5px] text-foreground">{fullName || "—"}</p>
          <p className="mt-1 text-[13.5px] text-muted-foreground">{user.email}</p>
          <Link
            to="/account/profile"
            className="mt-4 inline-block text-[12px] uppercase tracking-widest underline hover:text-foreground"
          >
            Edit Profile & Shipping →
          </Link>
        </div>

        {/* Support */}
        <div>
          <h2 className="text-[12px] font-medium uppercase tracking-widest text-foreground">
            Support
          </h2>
          <p className="mt-4 text-[13.5px] text-muted-foreground">
            <a
              href="mailto:insightnetworks@koreabridging.com"
              className="underline hover:text-foreground"
            >
              insightnetworks@koreabridging.com
            </a>
          </p>
          <p className="mt-2 text-[12.5px] text-muted-foreground">
            Weekdays 10:00–18:00 KST
          </p>
        </div>
      </div>

      <div className="mt-14 flex items-center gap-6">
        <Link
          to="/"
          className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-9 text-[12px] font-medium uppercase tracking-widest text-background transition-opacity hover:opacity-90"
        >
          Continue Shopping
        </Link>
        <button
          type="button"
          onClick={async () => {
            await signOut();
            navigate({ to: "/" });
          }}
          className="text-[13px] text-muted-foreground underline hover:text-foreground"
        >
          Sign Out
        </button>
      </div>
    </section>
  );
}
