import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type CodeStat = {
  code: string;
  total: number;
  unique_ips: number;
  last_click: string | null;
};

export type RecentClick = {
  code: string;
  created_at: string;
  ip: string | null;
  referer: string | null;
  user_agent: string | null;
};

export type DiscountAnalytics = {
  isAdmin: boolean;
  stats: CodeStat[];
  recent: RecentClick[];
  totalClicks: number;
  since: string;
};

export const getDiscountAnalytics = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { days: number }) => ({
    days: Math.max(1, Math.min(365, Math.floor(data?.days ?? 30))),
  }))
  .handler(async ({ data, context }): Promise<DiscountAnalytics> => {
    const { supabase, userId } = context;

    const { data: roleRow } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleRow) {
      return { isAdmin: false, stats: [], recent: [], totalClicks: 0, since: "" };
    }

    const since = new Date(Date.now() - data.days * 24 * 60 * 60 * 1000).toISOString();

    const { data: rows, error } = await supabase
      .from("discount_clicks")
      .select("code, ip, referer, user_agent, created_at")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(5000);

    if (error) throw error;

    const byCode = new Map<string, { total: number; ips: Set<string>; last: string }>();
    for (const r of rows ?? []) {
      const k = r.code;
      const b = byCode.get(k) ?? { total: 0, ips: new Set<string>(), last: r.created_at };
      b.total += 1;
      if (r.ip) b.ips.add(r.ip);
      if (r.created_at > b.last) b.last = r.created_at;
      byCode.set(k, b);
    }

    const stats: CodeStat[] = Array.from(byCode.entries())
      .map(([code, v]) => ({
        code,
        total: v.total,
        unique_ips: v.ips.size,
        last_click: v.last,
      }))
      .sort((a, b) => b.total - a.total);

    return {
      isAdmin: true,
      stats,
      recent: (rows ?? []).slice(0, 100),
      totalClicks: rows?.length ?? 0,
      since,
    };
  });
