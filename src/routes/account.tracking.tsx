import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getDiscountStats } from "@/lib/tracking.functions";

export const Route = createFileRoute("/account/tracking")({
  component: TrackingPage,
  head: () => ({
    meta: [{ title: "Discount Code Tracking — Purève Seoul" }],
  }),
});

function TrackingPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const fetchStats = useServerFn(getDiscountStats);

  const { data, isLoading } = useQuery({
    queryKey: ["discount-stats"],
    queryFn: () => fetchStats(),
    enabled: !!user,
  });

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/account/login" });
  }, [user, loading, navigate]);

  if (loading || !user) return null;

  const codeStats = data?.codeStats ?? [];
  const recentClicks = data?.recentClicks ?? [];

  return (
    <section className="mx-auto max-w-[1280px] px-5 py-14 md:px-10 md:py-20">
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="font-heading text-[40px] leading-tight tracking-tight md:text-[48px]">
          Discount Tracking
        </h1>
        <Link
          to="/account/dashboard"
          className="text-[12px] uppercase tracking-widest underline hover:text-foreground"
        >
          ← Account
        </Link>
      </div>
      <p className="mt-2 text-[13.5px] text-muted-foreground">
        Click counts per influencer code. For conversion (orders/revenue), check Shopify Admin → Discounts.
      </p>

      {/* Summary table */}
      <div className="mt-10">
        <h2 className="text-[12px] font-medium uppercase tracking-widest">
          By Code
        </h2>
        <div className="mt-4 overflow-x-auto">
          {isLoading ? (
            <p className="text-[13.5px] text-muted-foreground">Loading…</p>
          ) : data?.error ? (
            <p className="text-[13.5px] text-muted-foreground">{data.error}</p>
          ) : codeStats.length === 0 ? (
            <p className="text-[13.5px] text-muted-foreground">No clicks yet.</p>
          ) : (
            <table className="w-full min-w-[600px] border-y text-[13.5px]">
              <thead>
                <tr className="border-b text-left text-[11.5px] uppercase tracking-widest text-muted-foreground">
                  <th className="py-3 pr-4">Code</th>
                  <th className="py-3 pr-4 text-right">Total Clicks</th>
                  <th className="py-3 pr-4 text-right">Unique IPs</th>
                  <th className="py-3 pr-4 text-right">Last 7 Days</th>
                  <th className="py-3 pr-4">Last Click</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {codeStats.map((s) => (
                  <tr key={s.code}>
                    <td className="py-3 pr-4 font-medium">{s.code}</td>
                    <td className="py-3 pr-4 text-right">{s.totalClicks}</td>
                    <td className="py-3 pr-4 text-right">{s.uniqueIps}</td>
                    <td className="py-3 pr-4 text-right">{s.last7Days}</td>
                    <td className="py-3 pr-4 text-muted-foreground">
                      {s.lastClickAt
                        ? new Date(s.lastClickAt).toLocaleString("ko-KR")
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Recent clicks */}
      <div className="mt-14">
        <h2 className="text-[12px] font-medium uppercase tracking-widest">
          Recent Clicks (last 50)
        </h2>
        <div className="mt-4 overflow-x-auto">
          {recentClicks.length === 0 ? (
            <p className="text-[13.5px] text-muted-foreground">No clicks yet.</p>
          ) : (
            <table className="w-full min-w-[700px] border-y text-[12.5px]">
              <thead>
                <tr className="border-b text-left text-[11px] uppercase tracking-widest text-muted-foreground">
                  <th className="py-3 pr-4">Time</th>
                  <th className="py-3 pr-4">Code</th>
                  <th className="py-3 pr-4">IP</th>
                  <th className="py-3 pr-4">Referer</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentClicks.map((c, i) => (
                  <tr key={i}>
                    <td className="py-2 pr-4 text-muted-foreground">
                      {new Date(c.created_at).toLocaleString("ko-KR")}
                    </td>
                    <td className="py-2 pr-4 font-medium">{c.code}</td>
                    <td className="py-2 pr-4 text-muted-foreground">{c.ip ?? "—"}</td>
                    <td className="py-2 pr-4 max-w-[300px] truncate text-muted-foreground">
                      {c.referer ?? "direct"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}
