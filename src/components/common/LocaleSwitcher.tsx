import { useEffect, useRef, useState } from "react";
import { Globe, Check } from "lucide-react";
import { useLocale, LOCALES, CURRENCIES, type Currency } from "@/hooks/useLocale";

const CURRENCY_CODES: Currency[] = ["USD", "TWD", "CNY", "THB", "KRW"];

export function LocaleSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, currency, setCurrency, t } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Language and currency"
        className="inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-widest transition-colors hover:opacity-60"
      >
        <Globe size={14} />
        {compact ? current.code.toUpperCase() : `${current.native} / ${currency}`}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 p-4"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        >
          <div
            className="w-full max-w-sm rounded-xl bg-background p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Language */}
            <div className="mb-3 text-[12px] font-semibold uppercase tracking-widest text-muted-foreground">
              {t("i18n.language")}
            </div>
            <div className="mb-5 grid gap-1">
              {LOCALES.map((l) => {
                const active = l.code === locale;
                return (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setLocale(l.code)}
                    className={`flex items-center justify-between rounded-lg px-3 py-3 text-left text-[15px] transition-colors hover:bg-muted ${
                      active ? "font-semibold" : "font-normal"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xl">{l.flag}</span>
                      <span>{l.native}</span>
                    </span>
                    {active && <Check size={18} className="text-foreground" />}
                  </button>
                );
              })}
            </div>

            {/* Currency */}
            <div className="mb-2 text-[12px] font-semibold uppercase tracking-widest text-muted-foreground">
              {t("i18n.currency")}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {CURRENCY_CODES.map((c) => {
                const active = c === currency;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCurrency(c)}
                    className={`rounded-lg border px-2 py-3 text-[14px] font-medium transition-colors ${
                      active
                        ? "border-foreground bg-background text-foreground"
                        : "border-border bg-background text-foreground hover:bg-muted"
                    }`}
                  >
                    {CURRENCIES[c].symbol} {c}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
