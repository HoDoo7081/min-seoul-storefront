import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export const Route = createFileRoute("/discount/$code")({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        const code = params.code.slice(0, 100);

        // Log click (best-effort, don't block redirect on failure)
        try {
          const headers = request.headers;
          const ip =
            headers.get("cf-connecting-ip") ||
            headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            null;
          await supabaseAdmin.from("discount_clicks").insert({
            code,
            ip,
            user_agent: headers.get("user-agent"),
            referer: headers.get("referer"),
          });
        } catch (e) {
          console.error("[discount click log failed]", e);
        }

        const resHeaders = new Headers();
        resHeaders.set("Location", "/");
        resHeaders.append(
          "Set-Cookie",
          `utm_discount=${encodeURIComponent(code)}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`,
        );
        resHeaders.append(
          "Set-Cookie",
          `utm_source=${encodeURIComponent(code)}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`,
        );
        return new Response(null, { status: 302, headers: resHeaders });
      },
    },
  },
});
