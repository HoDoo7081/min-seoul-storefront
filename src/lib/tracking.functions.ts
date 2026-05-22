import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export interface CodeStat {
  code: string;
  totalClicks: number;
  uniqueIps: number;
  last7Days: number;
  lastClickAt: string | null;
}

export interface RecentClick {
  code: string;
  created_at: string;
  ip: string | null;
  referer: string | null;
  user_agent: string | null;
}

export const getDiscountStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async (): Promise<{
    codeStats: CodeStat[];
    recentClicks: RecentClick[];
    error: string | null;
  }> => {
    try {
      const { data, error } = await supabaseAdmin
        .from("discount_clicks")
        .select("code, ip, referer, user_agent, created_at")
        .order("created_at", { ascending: false })
        .limit(5000);

      if (error) {
        console.error("[getDiscountStats]", error);
        return { codeStats: [], recentClicks: [], error: error.message };
      }

      const rows = data ?? [];
      const now = Date.now();
      const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

      const byCode = new Map<
        string,
        { total: number; ips: Set<string>; last7: number; lastAt: string | null }
      >();

      for (const r of rows) {
        const entry = byCode.get(r.code) ?? {
          total: 0,
          ips: new Set<string>(),
          last7: 0,
          lastAt: null,
        };
        entry.total += 1;
        if (r.ip) entry.ips.add(r.ip);
        const ts = new Date(r.created_at).getTime();
        if (ts >= sevenDaysAgo) entry.last7 += 1;
        if (!entry.lastAt || ts > new Date(entry.lastAt).getTime()) {
          entry.lastAt = r.created_at;
        }
        byCode.set(r.code, entry);
      }

      const codeStats: CodeStat[] = Array.from(byCode.entries())
        .map(([code, v]) => ({
          code,
          totalClicks: v.total,
          uniqueIps: v.ips.size,
          last7Days: v.last7,
          lastClickAt: v.lastAt,
        }))
        .sort((a, b) => b.totalClicks - a.totalClicks);

      const recentClicks: RecentClick[] = rows.slice(0, 50).map((r) => ({
        code: r.code,
        created_at: r.created_at,
        ip: r.ip,
        referer: r.referer,
        user_agent: r.user_agent,
      }));

      return { codeStats, recentClicks, error: null };
    } catch (err) {
      console.error("[getDiscountStats]", err);
      return { codeStats: [], recentClicks: [], error: "Failed to load stats" };
    }
  });
