import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, Search as SearchIcon } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { brands } from "@/data/mockBrands";
import { MenuOverlay } from "./MenuOverlay";
import { AuthModal } from "@/components/common/AuthModal";
import { useAuth } from "@/hooks/useAuth";

const NAV = [
  { label: "Products", to: "/collections/$brandHandle" as const, params: { brandHandle: "all" }, matchPrefix: "/collections" },
  { label: "About",    to: "/pages/about" as const },
  { label: "Contact",  to: "/pages/contact" as const },
];

export function GNB() {
  const { totalItems: count, toggleDrawer } = useCart();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (menuOpen || searchOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, searchOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
          scrolled ? "bg-background shadow-[0_1px_0_var(--color-border)]" : "bg-background"
        }`}
      >
        {/* Row 1: Menu+Search / Logo / Account+Cart */}
        <div className="relative mx-auto flex h-12 max-w-[1280px] items-center px-4 md:h-14 md:px-10">
          {/* LEFT */}
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Menu"
              className="inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-widest transition-colors hover:opacity-60"
            >
              <Menu size={16} />
              Menu
            </button>
            <Link
              to="/search"
              aria-label="Search"
              className="hidden text-[12px] font-medium uppercase tracking-widest transition-colors hover:opacity-60 md:block"
            >
              Search
            </Link>
          </div>

          {/* CENTER — Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 font-heading" style={{ fontSize: "clamp(16px, 4vw, 22px)", letterSpacing: "0.06em" }}>
          </Link>

          {/* RIGHT */}
          <div className="flex items-center justify-end gap-5">
            {user ? (
              <div className="group relative hidden md:block">
                <button
                  type="button"
                  aria-label="Account"
                  className="text-[12px] font-medium uppercase tracking-widest transition-colors hover:opacity-60"
                >
                  {user.user_metadata?.full_name?.split(" ")[0] ?? "My Account"}
                </button>
                <div className="invisible absolute right-0 top-full z-50 min-w-[140px] pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  <div className="rounded-md border bg-background py-1 shadow-lg">
                    <button
                      type="button"
                      onClick={() => signOut()}
                      className="block w-full px-4 py-2 text-left text-[12px] font-medium uppercase tracking-widest hover:bg-muted"
                    >
                      로그아웃
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/account/login"
                aria-label="Account"
                className="hidden text-[12px] font-medium uppercase tracking-widest transition-colors hover:opacity-60 md:block"
              >
                Account
              </Link>
            )}
            <button
              type="button"
              onClick={() => toggleDrawer(true)}
              aria-label="Cart"
              className="text-[12px] font-medium uppercase tracking-widest transition-colors hover:opacity-60"
            >
              Cart {count > 0 ? count : 0}
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
          </nav>
        </div>
      </header>

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40 animate-fade-in"
            onClick={() => setSearchOpen(false)}
          />
          <div className="relative mx-auto mt-0 w-full max-w-[720px] animate-fade-in bg-background p-6 shadow-xl md:mt-24 md:rounded-[12px]">
            <div className="flex items-center gap-3 border-b pb-3">
              <SearchIcon size={18} className="text-muted-foreground" />
              <input
                autoFocus
                placeholder="Search products, brands…"
                className="flex-1 bg-transparent text-[15px] outline-none"
              />
              <button onClick={() => setSearchOpen(false)} aria-label="Close search">
                <X size={18} />
              </button>
            </div>
            <p className="mt-4 text-[12px] uppercase tracking-widest text-muted-foreground">
              Suggested
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {brands.map((b) => (
                <Link
                  key={b.handle}
                  to="/collections/$brandHandle"
                  params={{ brandHandle: b.handle }}
                  onClick={() => setSearchOpen(false)}
                  className="rounded-full border px-3 py-1.5 text-[12px] hover:bg-muted"
                >
                  {b.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Menu drawer — slides in from LEFT */}
      {menuOpen && <MenuOverlay onClose={() => setMenuOpen(false)} />}

      {/* Auth modal */}
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}
