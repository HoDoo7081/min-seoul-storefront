import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { MenuOverlay } from "./MenuOverlay";
import { AuthModal } from "@/components/common/AuthModal";
import { LocaleSwitcher } from "@/components/common/LocaleSwitcher";
import { useAuth } from "@/hooks/useAuth";
import { useLocale } from "@/hooks/useLocale";

export function GNB() {
  const { totalItems: count, toggleDrawer } = useCart();
  const { pathname } = useLocation();
  const { t } = useLocale();
  const NAV = [
    { label: t("nav.products"), to: "/collections/$brandHandle" as const, params: { brandHandle: "all" }, matchPrefix: "/collections" },
    { label: t("nav.about"),    to: "/pages/about" as const },
    { label: t("nav.contact"),  to: "/pages/contact" as const },
  ];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
          scrolled ? "bg-background shadow-[0_1px_0_var(--color-border)]" : "bg-background"
        }`}
      >
        {/* Row 1: Menu+Search / Logo / Account+Cart */}
        <div className="mx-auto grid h-14 max-w-[1280px] grid-cols-3 items-center px-4 md:h-16 md:px-10">
          {/* LEFT */}
          <div className="flex items-center gap-5 justify-self-start">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t("nav.menu")}
              className="inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-widest transition-colors hover:opacity-60"
            >
              <Menu size={16} />
              {t("nav.menu")}
            </button>
            <Link
              to="/search"
              aria-label={t("nav.search")}
              className="hidden text-[12px] font-medium uppercase tracking-widest transition-colors hover:opacity-60 md:block"
            >
              {t("nav.search")}
            </Link>
          </div>

          {/* CENTER — Logo */}
          <Link
            to="/"
            className="justify-self-center whitespace-nowrap"
            style={{
              fontFamily: '"Cormorant Garamond", "Times New Roman", serif',
              fontSize: "clamp(20px, 3.4vw, 28px)",
              fontWeight: 400,
              fontStyle: "italic",
              letterSpacing: "0.14em",
            }}
          >
            Min Seoul
          </Link>

          {/* RIGHT */}
          <div className="flex items-center gap-5 justify-self-end">
            {user ? (
              <div className="group relative hidden md:block">
                <button
                  type="button"
                  aria-label={t("nav.account")}
                  className="text-[12px] font-medium uppercase tracking-widest transition-colors hover:opacity-60"
                >
                  {user.user_metadata?.full_name?.split(" ")[0] ?? t("nav.myAccount")}
                </button>
                <div className="invisible absolute right-0 top-full z-50 min-w-[140px] pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  <div className="rounded-md border bg-background py-1 shadow-lg">
                    <Link
                      to="/account/dashboard"
                      className="block w-full px-4 py-2 text-left text-[12px] font-medium uppercase tracking-widest hover:bg-muted"
                    >
                      {t("nav.myAccount")}
                    </Link>
                    <button
                      type="button"
                      onClick={() => signOut()}
                      className="block w-full px-4 py-2 text-left text-[12px] font-medium uppercase tracking-widest hover:bg-muted"
                    >
                      {t("nav.signOut")}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/account/login"
                aria-label={t("nav.account")}
                className="hidden text-[12px] font-medium uppercase tracking-widest transition-colors hover:opacity-60 md:block"
              >
                {t("nav.account")}
              </Link>
            )}
            <LocaleSwitcher compact />
            <button
              type="button"
              onClick={() => toggleDrawer(true)}
              aria-label={t("nav.cart")}
              className="text-[12px] font-medium uppercase tracking-widest transition-colors hover:opacity-60"
            >
              {t("nav.cart")} {count > 0 ? count : 0}
            </button>
          </div>
        </div>


        {/* Row 2: Nav links */}
        <nav className="hidden border-t border-border md:block">
          <div className="mx-auto flex max-w-[1280px] items-center justify-center gap-6 px-5 md:gap-10 md:px-10">
            {NAV.map((n) => {
              const isPrefixActive = n.matchPrefix
                ? pathname.startsWith(n.matchPrefix) || pathname.startsWith("/products/")
                : false;
              const cls = `py-2.5 text-[12px] font-medium uppercase tracking-widest transition-colors hover:opacity-60${
                isPrefixActive ? " opacity-60" : ""
              }`;
              return "params" in n ? (
                <Link key={n.label} to={n.to} params={n.params} className={cls}>
                  {n.label}
                </Link>
              ) : (
                <Link
                  key={n.label}
                  to={n.to}
                  className={cls}
                  activeProps={{ className: "opacity-60" }}
                >
                  {n.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </header>


      {/* Menu drawer — slides in from LEFT */}
      {menuOpen && <MenuOverlay onClose={() => setMenuOpen(false)} />}

      {/* Auth modal */}
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}
