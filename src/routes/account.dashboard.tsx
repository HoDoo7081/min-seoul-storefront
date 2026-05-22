import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export const Route = createFileRoute("/account/dashboard")({
  component: DashboardPage,
  head: () => ({
    meta: [{ title: "My Account — Purève Seoul" }],
  }),
});

function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

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

  return (
    <section className="mx-auto max-w-[1280px] px-5 py-14 md:px-10 md:py-20">
      <h1 className="font-heading text-[40px] leading-tight tracking-tight md:text-[48px]">
        Hello, {firstName}
      </h1>
      <p className="mt-2 text-[14px] text-muted-foreground">{user.email}</p>

      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {/* Orders */}
        <div>
          <h2 className="text-[12px] font-medium uppercase tracking-widest text-foreground">
            Orders
          </h2>
          <p className="mt-4 text-[13.5px] leading-relaxed text-muted-foreground">
            Track your orders at{" "}
            <a
              href="https://pureveseoul.com/account"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              Shopify Order History
            </a>
          </p>
        </div>

        {/* Account Details */}
        <div>
          <h2 className="text-[12px] font-medium uppercase tracking-widest text-foreground">
            Account Details
          </h2>
          <p className="mt-4 text-[13.5px] text-foreground">
            {fullName || "—"}
          </p>
          <p className="mt-1 text-[13.5px] text-muted-foreground">{user.email}</p>
        </div>

        {/* Support */}
        <div>
          <h2 className="text-[12px] font-medium uppercase tracking-widest text-foreground">
            Support
          </h2>
          <p className="mt-4 text-[13.5px] text-muted-foreground">
            <a
              href="mailto:contact@koreabridging.com"
              className="underline hover:text-foreground"
            >
              contact@koreabridging.com
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
