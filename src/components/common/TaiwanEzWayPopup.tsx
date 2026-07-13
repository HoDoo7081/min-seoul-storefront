import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";

const DISMISS_KEY = "tw_ezway_popup_dismissed_v1";

/**
 * Popup shown once to visitors likely from Taiwan (browser language zh-TW / zh-Hant / TW timezone).
 * Explains that a Taiwan National ID / EZ Way number is required for customs clearance
 * and can be saved in the account profile so it's auto-attached to every order.
 */
export function TaiwanEzWayPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(DISMISS_KEY)) return;

    const lang = (navigator.language || "").toLowerCase();
    const langs = (navigator.languages || []).map((l) => l.toLowerCase());
    let tz = "";
    try {
      tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    } catch {
      /* noop */
    }

    const isTW =
      lang.includes("zh-tw") ||
      lang.includes("zh-hant") ||
      langs.some((l) => l.includes("zh-tw") || l.includes("zh-hant")) ||
      tz === "Asia/Taipei";

    if (!isTW) return;

    const t = window.setTimeout(() => setOpen(true), 800);
    return () => window.clearTimeout(t);
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* noop */
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 p-4 sm:items-center">
      <div className="relative w-full max-w-[440px] rounded-2xl bg-background p-7 shadow-2xl">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-foreground/60 hover:bg-muted hover:text-foreground"
        >
          <X size={18} />
        </button>

        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          For Taiwan customers · 台灣顧客須知
        </p>

        <h2 className="mt-2 font-heading text-[24px] leading-tight tracking-tight">
          需要 EZ Way 通關號碼
        </h2>

        <div className="mt-4 space-y-3 text-[13.5px] leading-relaxed text-foreground/85">
          <p>
            寄送至台灣的訂單，海關要求提供收件人的
            <strong className="mx-1">身分證字號（EZ Way 通關號碼）</strong>
            才能清關。
          </p>
          <p>
            請先註冊帳號並在個人資料儲存您的 ID，
            我們會自動填入每筆訂單，不需要每次重新輸入。
          </p>
          <p className="text-[12.5px] text-muted-foreground">
            Orders to Taiwan require the recipient's National ID / EZ Way number
            for customs. Save it once in your profile and it's auto-attached to
            every order.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <Link
            to="/account/profile"
            onClick={dismiss}
            className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-[12px] font-medium uppercase tracking-widest text-background transition-opacity hover:opacity-90"
          >
            前往設定 · Set up now
          </Link>
          <button
            type="button"
            onClick={dismiss}
            className="text-[12px] text-muted-foreground underline hover:text-foreground"
          >
            稍後再說 · Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
