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
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
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
        <div className="absolute right-0 top-full z-50 mt-2 w-[260px] rounded-md border bg-background p-3 shadow-lg">
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            {t("i18n.language") || "Language"}
          </div>
          <div className="mb-3 grid gap-1">
            {LOCALES.map((l) => {
              const active = l.code === locale;
              return (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLocale(l.code)}
                  className={`flex items-center justify-between rounded px-2 py-1.5 text-left text-sm hover:bg-muted ${
                    active ? "font-semibold" : ""
                  }`}
                >
                  <span>
                    <span className="mr-2">{l.flag}</span>
                    {l.native}
                  </span>
                  {active && <Check size={14} />}
                </button>
              );
            })}
          </div>

          <div className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            {t("i18n.currency") || "Currency"}
          </div>
          <div className="grid grid-cols-3 gap-1">
            {CURRENCY_CODES.map((c) => {
              const active = c === currency;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCurrency(c)}
                  className={`rounded border px-2 py-1.5 text-xs transition-colors hover:bg-muted ${
                    active ? "border-foreground font-semibold" : "border-border"
                  }`}
                >
                  {CURRENCIES[c].symbol} {c}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
