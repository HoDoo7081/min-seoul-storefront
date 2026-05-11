import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { brands } from "@/data/mockBrands";
import { useLocale, LOCALES, CURRENCIES, type Locale, type Currency } from "@/hooks/useLocale";

// ── 인라인 드롭다운 (Currency / Language) ────────────────────
function InlineDropdown({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-0.5 text-[13px] font-medium tracking-wide transition-colors hover:text-accent"
        aria-expanded={open}
      >
        {label}
        <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 min-w-[200px] overflow-hidden rounded-[10px] border bg-background py-2 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.18)] animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}

export function GNB() {
  const { totalItems: count, toggleDrawer } = useCart();
  const { locale, setLocale, currency, setCurrency, t, tr } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileBrandsOpen, setMobileBrandsOpen] = useState(false);

  const currentLocale = LOCALES.find((l) => l.code === locale);
  const currentCurrency = CURRENCIES[currency];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
          scrolled ? "bg-background shadow-[0_1px_0_var(--color-border)]" : "bg-background"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 md:px-10">
          {/* LEFT — Logo */}
          <Link to="/" className="font-heading" style={{ fontSize: 22, letterSpacing: "0.05em" }}>
            Selvé
          </Link>

          {/* CENTER — Nav (desktop) */}
          <nav className="hidden items-center gap-10 text-[13px] md:flex">
            <div
              className="relative"
              onMouseEnter={() => setBrandsOpen(true)}
              onMouseLeave={() => setBrandsOpen(false)}
            >
              <button
                className="inline-flex items-center gap-1 py-2 font-medium tracking-wide transition-colors hover:text-accent"
                onClick={() => setBrandsOpen((v) => !v)}
                aria-expanded={brandsOpen}
              >
                {t("nav.brand")}
                <ChevronDown size={14} className={`transition-transform ${brandsOpen ? "rotate-180" : ""}`} />
              </button>

              {brandsOpen && (
                <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 animate-fade-in">
                  <div
                    className="grid grid-cols-3 gap-4 rounded-[12px] border bg-background p-5 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.18)]"
                    style={{ width: 720 }}
                  >
                    {brands.map((b) => (
                      <Link
                        key={b.handle}
                        to="/collections/$brandHandle"
                        params={{ brandHandle: b.handle }}
                        onClick={() => setBrandsOpen(false)}
                        className="group block rounded-[10px] border border-transparent p-4 transition-colors hover:border-border hover:bg-muted/50"
                      >
                        <div className="mb-3 h-1 w-8 rounded-full" style={{ backgroundColor: b.accentColor }} />
                        <h3 className="font-heading text-lg leading-none">{b.name}</h3>
                        <p className="mt-2 text-xs text-muted-foreground">{tr(b.slogan)}</p>
                        <span className="mt-4 inline-block text-xs text-accent transition-transform group-hover:translate-x-0.5">
                          {t("nav.view")}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/collections/$brandHandle"
              params={{ brandHandle: "the-mute" }}
              className="py-2 font-medium tracking-wide transition-colors hover:text-accent"
            >
              {t("nav.collection")}
            </Link>
            <Link to="/pages/about" className="py-2 font-medium tracking-wide transition-colors hover:text-accent">
              {t("nav.about")}
            </Link>
          </nav>

          {/* RIGHT — 텍스트 메뉴 (desktop) */}
          <div className="hidden items-center gap-6 md:flex">
            {/* Currency */}
            <InlineDropdown label={`${currentCurrency.symbol} ${currency}`}>
              <p className="px-4 pb-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
                통화 선택
              </p>
              {(Object.entries(CURRENCIES) as [Currency, typeof CURRENCIES[Currency]][]).map(
                ([code, cfg]) => (
                  <button
                    key={code}
                    onClick={() => setCurrency(code)}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px] transition-colors hover:bg-muted ${
                      currency === code ? "font-semibold text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <span className="w-10">{code}</span>
                    <span className="flex-1">{cfg.symbol}</span>
                    {currency === code && <span className="text-accent">✓</span>}
                  </button>
                )
              )}
            </InlineDropdown>

            {/* Language */}
            <InlineDropdown label={`${currentLocale?.flag ?? ""} ${currentLocale?.native ?? ""}`}>
              <p className="px-4 pb-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
                언어 선택
              </p>
              {LOCALES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLocale(l.code as Locale)}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px] transition-colors hover:bg-muted ${
                    locale === l.code ? "font-semibold text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <span>{l.flag}</span>
                  <span className="flex-1">{l.native}</span>
                  {locale === l.code && <span className="text-accent">✓</span>}
                </button>
              ))}
            </InlineDropdown>

            <button
              type="button"
              className="text-[13px] font-medium tracking-wide transition-colors hover:text-accent"
            >
              ACCOUNT
            </button>

            <button
              type="button"
              onClick={() => toggleDrawer(true)}
              aria-label="Cart"
              className="text-[13px] font-medium tracking-wide transition-colors hover:text-accent"
            >
              CART {count > 0 ? count : 0}
            </button>
          </div>

          {/* 모바일 — 햄버거 + 카트 */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              type="button"
              onClick={() => toggleDrawer(true)}
              aria-label="Cart"
              className="text-[13px] font-medium tracking-wide"
            >
              CART {count}
            </button>
            <button
              aria-label="Menu"
              onClick={() => setDrawerOpen(true)}
              className="p-1"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 드로어 */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40 animate-fade-in"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-background shadow-xl animate-slide-in-right overflow-y-auto">
            <div className="flex h-16 items-center justify-between px-5">
              <span className="font-heading" style={{ fontSize: 20, letterSpacing: "0.05em" }}>
                Selvé
              </span>
              <button
                aria-label="Close menu"
                onClick={() => setDrawerOpen(false)}
                className="p-1.5"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col px-5 pt-4">
              <button
                className="flex items-center justify-between border-b py-4 text-left text-[13px] font-medium tracking-wide"
                onClick={() => setMobileBrandsOpen((v) => !v)}
                aria-expanded={mobileBrandsOpen}
              >
                <span>{t("nav.brand")}</span>
                <ChevronDown size={16} className={`transition-transform ${mobileBrandsOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileBrandsOpen && (
                <div className="flex flex-col border-b animate-accordion-down overflow-hidden">
                  {brands.map((b) => (
                    <Link
                      key={b.handle}
                      to="/collections/$brandHandle"
                      params={{ brandHandle: b.handle }}
                      onClick={() => setDrawerOpen(false)}
                      className="flex items-center gap-3 py-3 pl-3"
                    >
                      <span className="h-1 w-5 rounded-full" style={{ backgroundColor: b.accentColor }} />
                      <span className="text-foreground">{b.name}</span>
                    </Link>
                  ))}
                </div>
              )}

              <Link
                to="/collections/$brandHandle"
                params={{ brandHandle: "the-mute" }}
                onClick={() => setDrawerOpen(false)}
                className="border-b py-4 text-[13px] font-medium tracking-wide"
              >
                {t("nav.collection")}
              </Link>
              <Link
                to="/pages/about"
                onClick={() => setDrawerOpen(false)}
                className="border-b py-4 text-[13px] font-medium tracking-wide"
              >
                {t("nav.about")}
              </Link>
              <button
                type="button"
                className="border-b py-4 text-left text-[13px] font-medium tracking-wide"
              >
                ACCOUNT
              </button>

              {/* 모바일 통화/언어 */}
              <div className="mt-6">
                <p className="mb-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                  통화
                </p>
                <div className="flex flex-wrap gap-2">
                  {(Object.entries(CURRENCIES) as [Currency, typeof CURRENCIES[Currency]][]).map(
                    ([code]) => (
                      <button
                        key={code}
                        onClick={() => setCurrency(code)}
                        className={`rounded-full border px-3 py-1 text-[12px] font-medium transition-colors ${
                          currency === code
                            ? "border-foreground bg-foreground text-background"
                            : "border-border text-muted-foreground hover:border-foreground"
                        }`}
                      >
                        {code}
                      </button>
                    )
                  )}
                </div>

                <p className="mb-2 mt-5 text-[11px] uppercase tracking-wider text-muted-foreground">
                  언어
                </p>
                <div className="flex flex-wrap gap-2">
                  {LOCALES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => setLocale(l.code as Locale)}
                      className={`rounded-full border px-3 py-1 text-[12px] font-medium transition-colors ${
                        locale === l.code
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-muted-foreground hover:border-foreground"
                      }`}
                    >
                      {l.flag} {l.native}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
