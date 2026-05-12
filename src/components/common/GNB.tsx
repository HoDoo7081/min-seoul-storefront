import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Search as SearchIcon } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { brands } from "@/data/mockBrands";

const NAV = [
  { label: "Home", to: "/" as const },
  { label: "About", to: "/pages/about" as const },
  { label: "Products", to: "/collections/$brandHandle" as const, params: { brandHandle: "all" } },
  { label: "Contact", to: "/pages/contact" as const },
];

export function GNB() {
  const { totalItems: count, toggleDrawer } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const open = menuOpen || searchOpen;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, searchOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
          scrolled ? "bg-background shadow-[0_1px_0_var(--color-border)]" : "bg-background"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 md:px-10">
          <Link to="/" className="font-heading" style={{ fontSize: 22, letterSpacing: "0.05em" }}>
            Selvé
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-10 text-[13px] md:flex">
            {NAV.map((n) =>
              n.params ? (
                <Link
                  key={n.label}
                  to={n.to}
                  params={n.params}
                  className="py-2 font-medium tracking-wide transition-colors hover:text-accent"
                  activeProps={{ className: "text-accent" }}
                >
                  {n.label}
                </Link>
              ) : (
                <Link
                  key={n.label}
                  to={n.to}
                  className="py-2 font-medium tracking-wide transition-colors hover:text-accent"
                  activeOptions={{ exact: n.to === "/" }}
                  activeProps={{ className: "text-accent" }}
                >
                  {n.label}
                </Link>
              )
            )}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4 md:gap-6">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="hidden items-center gap-1.5 text-[13px] font-medium tracking-wide transition-colors hover:text-accent md:inline-flex"
            >
              <SearchIcon size={15} />
              Search
            </button>
            <button
              type="button"
              onClick={() => toggleDrawer(true)}
              aria-label="Cart"
              className="text-[13px] font-medium tracking-wide transition-colors hover:text-accent"
            >
              CART {count > 0 ? count : 0}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Menu"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium tracking-wide transition-colors hover:text-accent"
            >
              <Menu size={16} />
              <span className="hidden sm:inline">Menu</span>
            </button>
          </div>
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

      {/* Menu drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40 animate-fade-in"
            onClick={() => setMenuOpen(false)}
          />
          <aside className="absolute right-0 top-0 h-full w-[82%] max-w-sm animate-slide-in-right overflow-y-auto bg-background shadow-xl">
            <div className="flex h-16 items-center justify-between px-5">
              <span className="font-heading" style={{ fontSize: 20, letterSpacing: "0.05em" }}>
                Selvé
              </span>
              <button aria-label="Close menu" onClick={() => setMenuOpen(false)} className="p-1.5">
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col px-5 pt-2">
              {NAV.map((n) =>
                n.params ? (
                  <Link
                    key={n.label}
                    to={n.to}
                    params={n.params}
                    onClick={() => setMenuOpen(false)}
                    className="border-b py-4 text-[14px] font-medium tracking-wide"
                  >
                    {n.label}
                  </Link>
                ) : (
                  <Link
                    key={n.label}
                    to={n.to}
                    onClick={() => setMenuOpen(false)}
                    className="border-b py-4 text-[14px] font-medium tracking-wide"
                  >
                    {n.label}
                  </Link>
                )
              )}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="border-b py-4 text-left text-[14px] font-medium tracking-wide"
              >
                Search
              </button>

              <p className="mt-8 text-[11px] uppercase tracking-widest text-muted-foreground">
                Brands
              </p>
              <div className="mt-3 flex flex-col">
                {brands.map((b) => (
                  <Link
                    key={b.handle}
                    to="/collections/$brandHandle"
                    params={{ brandHandle: b.handle }}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 py-2.5 text-[13px]"
                  >
                    <span
                      className="h-1 w-5 rounded-full"
                      style={{ backgroundColor: b.accentColor }}
                    />
                    {b.name}
                  </Link>
                ))}
              </div>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
