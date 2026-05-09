import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown, Globe } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { brands } from "@/data/mockBrands";
import { useLocale, LOCALES, CURRENCIES, type Locale, type Currency } from "@/hooks/useLocale";

function I18nModal({ onClose }: { onClose: () => void }) {
  const { locale, setLocale, currency, setCurrency, t } = useLocale();
  const [tab, setTab] = useState<"lang" | "cur">("lang");

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-black/50 p-4 pt-[10vh] animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[720px] overflow-hidden rounded-2xl bg-background shadow-2xl"
      >
        {/* Header with tabs + close */}
        <div className="flex items-center justify-between border-b px-6 pt-6">
          <div className="flex gap-8">
            <button
              onClick={() => setTab("lang")}
              className={`pb-4 text-[15px] font-medium border-b-2 transition-colors ${tab === "lang" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              {t("i18n.language")}
            </button>
            <button
              onClick={() => setTab("cur")}
              className={`pb-4 text-[15px] font-medium border-b-2 transition-colors ${tab === "cur" ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              {t("i18n.currency")}
            </button>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="mb-2 rounded-full p-2 transition-colors hover:bg-muted"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          {tab === "lang" && (
            <div>
              <p className="mb-3 text-[12px] font-medium uppercase tracking-wider text-muted-foreground">
                {t("i18n.allLang")}
              </p>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {LOCALES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLocale(l.code as Locale); onClose(); }}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-[14px] transition-colors ${locale === l.code ? "bg-muted font-semibold" : "hover:bg-muted/60"}`}
                  >
                    <span className="text-lg">{l.flag}</span>
                    <span>{l.native}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {tab === "cur" && (
            <div>
              <p className="mb-3 text-[12px] font-medium uppercase tracking-wider text-muted-foreground">
                {t("i18n.mainCur")}
              </p>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {(Object.entries(CURRENCIES) as [Currency, typeof CURRENCIES[Currency]][]).map(([code, cfg]) => (
                  <button
                    key={code}
                    onClick={() => { setCurrency(code); onClose(); }}
                    className={`flex flex-col items-start gap-0.5 rounded-xl px-4 py-3 text-left text-[14px] transition-colors ${currency === code ? "bg-muted font-semibold" : "hover:bg-muted/60"}`}
                  >
                    <span>{code}</span>
                    <span className="text-[12px] text-muted-foreground">{cfg.symbol} — {cfg.locale}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function GNB() {
  const { totalItems: count, toggleDrawer } = useCart();
  const { locale, currency, t } = useLocale();
  const [scrolled,         setScrolled]         = useState(false);
  const [brandsOpen,       setBrandsOpen]       = useState(false);
  const [drawerOpen,       setDrawerOpen]       = useState(false);
  const [mobileBrandsOpen, setMobileBrandsOpen] = useState(false);
  const [i18nOpen,         setI18nOpen]         = useState(false);

  const currentLocale = LOCALES.find((l) => l.code === locale);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (drawerOpen || i18nOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen, i18nOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
          scrolled ? "bg-background shadow-[0_1px_0_var(--color-border)]" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 md:px-10">
          {/* LEFT — Logo */}
          <Link to="/" className="font-heading" style={{ fontSize: 22, letterSpacing: "0.05em" }}>
            Selvé
          </Link>

          {/* CENTER — Nav */}
          <nav className="hidden items-center gap-10 text-sm md:flex">
            <div className="relative" onMouseEnter={() => setBrandsOpen(true)} onMouseLeave={() => setBrandsOpen(false)}>
              <button
                className="inline-flex items-center gap-1 py-2 transition-colors hover:text-accent"
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
                        <p className="mt-2 text-xs text-muted-foreground">{b.slogan}</p>
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
              className="py-2 transition-colors hover:text-accent"
            >
              {t("nav.collection")}
            </Link>
            <Link to="/pages/about" className="py-2 transition-colors hover:text-accent">
              {t("nav.about")}
            </Link>
          </nav>

          {/* RIGHT — Icons */}
          <div className="flex items-center gap-3 md:gap-4">
            <button aria-label="Search" className="hidden p-1.5 transition-colors hover:text-accent md:inline-flex">
              <Search size={18} />
            </button>
            <button aria-label="Wishlist" className="hidden p-1.5 transition-colors hover:text-accent md:inline-flex">
              <Heart size={18} />
            </button>

            {/* 🌐 언어/통화 버튼 — 장바구니 바로 왼쪽 */}
            <button
              type="button"
              onClick={() => setI18nOpen(true)}
              aria-label="Language and currency"
              className="hidden md:inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] font-medium transition-colors hover:bg-muted"
            >
              <span>{currentLocale?.flag}</span>
              <span>{currency}</span>
            </button>

            {/* 장바구니 */}
            <button
              type="button"
              onClick={() => toggleDrawer(true)}
              aria-label="Cart"
              className="relative p-1.5 transition-colors hover:text-accent"
            >
              <ShoppingBag size={18} />
              {count > 0 && (
                <span className="absolute -right-1 -top-0.5 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium leading-none text-primary-foreground">
                  {count}
                </span>
              )}
            </button>

            <button aria-label="Menu" onClick={() => setDrawerOpen(true)} className="p-1.5 md:hidden">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {i18nOpen && <I18nModal onClose={() => setI18nOpen(false)} />}

      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40 animate-fade-in" onClick={() => setDrawerOpen(false)} />
          <aside className="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-background shadow-xl animate-slide-in-right">
            <div className="flex h-16 items-center justify-between px-5">
              <span className="font-heading" style={{ fontSize: 20, letterSpacing: "0.05em" }}>Selvé</span>
              <button aria-label="Close menu" onClick={() => setDrawerOpen(false)} className="p-1.5">
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col px-5 pt-4 text-sm">
              <button
                className="flex items-center justify-between border-b py-4 text-left"
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
                      className="flex items-center gap-3 py-3 pl-3 text-muted-foreground"
                    >
                      <span className="h-1 w-5 rounded-full" style={{ backgroundColor: b.accentColor }} />
                      <span className="text-foreground">{b.name}</span>
                      <span className="text-xs">— {b.slogan}</span>
                    </Link>
                  ))}
                </div>
              )}
              <Link
                to="/collections/$brandHandle"
                params={{ brandHandle: "the-mute" }}
                onClick={() => setDrawerOpen(false)}
                className="border-b py-4"
              >
                {t("nav.collection")}
              </Link>
              <Link to="/pages/about" onClick={() => setDrawerOpen(false)} className="border-b py-4">
                {t("nav.about")}
              </Link>

              <button
                onClick={() => { setDrawerOpen(false); setI18nOpen(true); }}
                className="mt-6 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm transition-colors hover:bg-muted"
              >
                <Globe size={16} />
                <span>{currentLocale?.native} · {currency}</span>
              </button>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
