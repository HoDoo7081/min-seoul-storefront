import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getDiscountAnalytics } from "@/lib/discount-analytics.functions";

export const Route = createFileRoute("/account/admin-discounts")({
  component: AdminDiscountsPage,
  head: () => ({
    meta: [
      { title: "Discount Analytics — Admin" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const RANGES = [
  { label: "24h", days: 1 },
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
];

function AdminDiscountsPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const fetchAnalytics = useServerFn(getDiscountAnalytics);
  const [days, setDays] = useState(30);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/account/login" });
  }, [user, loading, navigate]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["discount-analytics", days, user?.id],
    queryFn: () => fetchAnalytics({ data: { days } }),
    enabled: !!user,
  });

  if (loading || !user) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-[1280px] items-center justify-center px-5 py-14">
        <p className="text-[13px] text-muted-foreground">Loading…</p>
      </section>
    );
  }

  if (data && !data.isAdmin) {
    return (
      <section className="mx-auto max-w-[1280px] px-5 py-14 md:px-10 md:py-20">
        <h1 className="font-heading text-[24px]">Access denied</h1>
        <p className="mt-3 text-[13px] text-muted-foreground">
          This dashboard is restricted to admin accounts.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1280px] px-5 py-10 md:px-10 md:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-[28px] leading-none">Discount Analytics</h1>
          <p className="mt-2 text-[12px] uppercase tracking-widest text-muted-foreground">
            Clicks by influencer code
          </p>
        </div>
        <div className="flex gap-1 rounded-md border p-1">
          {RANGES.map((r) => (
            <button
              key={r.days}
              onClick={() => setDays(r.days)}
              className={`px-3 py-1.5 text-[12px] font-medium uppercase tracking-widest transition-colors ${
                days === r.days ? "bg-foreground text-background" : "hover:opacity-60"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading && (
        <p className="mt-10 text-[13px] text-muted-foreground">Loading…</p>
      )}
      {error && (
        <p className="mt-10 text-[13px] text-destructive">
          {(error as Error).message}
        </p>
      )}

      {data?.isAdmin && (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total clicks" value={data.totalClicks} />
            <StatCard label="Unique codes" value={data.stats.length} />
            <StatCard
              label="Top code"
              value={data.stats[0]?.code ?? "—"}
              sub={data.stats[0] ? `${data.stats[0].total} clicks` : ""}
            />
            <StatCard
              label="Since"
              value={new Date(data.since).toLocaleDateString()}
            />
          </div>

          <h2 className="mt-12 font-heading text-[18px]">By code</h2>
          <div className="mt-4 overflow-x-auto rounded-md border">
            <table className="w-full text-[13px]">
              <thead className="bg-muted/40 text-left text-[11px] uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3 text-right">Clicks</th>
                  <th className="px-4 py-3 text-right">Unique IPs</th>
                  <th className="px-4 py-3">Last click</th>
                </tr>
              </thead>
              <tbody>
                {data.stats.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-muted-foreground">
                      No clicks in this period
                    </td>
                  </tr>
                )}
                {data.stats.map((s) => (
                  <tr key={s.code} className="border-t">
                    <td className="px-4 py-3 font-medium">{s.code}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{s.total}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{s.unique_ips}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {s.last_click ? new Date(s.last_click).toLocaleString() : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mt-12 font-heading text-[18px]">Recent clicks</h2>
          <div className="mt-4 overflow-x-auto rounded-md border">
            <table className="w-full text-[13px]">
              <thead className="bg-muted/40 text-left text-[11px] uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">IP</th>
                  <th className="px-4 py-3">Referer</th>
                </tr>
              </thead>
              <tbody>
                {data.recent.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-muted-foreground">
                      No recent clicks
                    </td>
                  </tr>
                )}
                {data.recent.map((r, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(r.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 font-medium">{r.code}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.ip ?? "—"}</td>
                    <td className="max-w-[280px] truncate px-4 py-3 text-muted-foreground">
                      {r.referer ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-md border p-5">
      <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-2 font-heading text-[26px] leading-none">{value}</p>
      {sub && <p className="mt-1 text-[12px] text-muted-foreground">{sub}</p>}
    </div>
  );
}
