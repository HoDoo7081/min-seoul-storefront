import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { brands } from "@/data/mockBrands";

export function GNB() {
  const { totalItems: count, toggleDrawer } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileBrandsOpen, setMobileBrandsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
          scrolled
            ? "bg-background shadow-[0_1px_0_var(--color-border)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 md:px-10">
          {/* LEFT — Logo */}
          <Link
            to="/"
            className="font-heading"
            style={{ fontSize: 22, letterSpacing: "0.05em" }}
          >
            BridgeGroup
          </Link>

          {/* CENTER — Nav */}
          <nav className="hidden items-center gap-10 text-sm md:flex">
            <div
              className="relative"
              onMouseEnter={() => setBrandsOpen(true)}
              onMouseLeave={() => setBrandsOpen(false)}
            >
              <button
                className="inline-flex items-center gap-1 py-2 transition-colors hover:text-accent"
                onClick={() => setBrandsOpen((v) => !v)}
                aria-expanded={brandsOpen}
              >
                브랜드
                <ChevronDown
                  size={14}
                  className={`transition-transform ${brandsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {brandsOpen && (
                <div
                  className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 animate-fade-in"
                >
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
                        <div
                          className="mb-3 h-1 w-8 rounded-full"
                          style={{ backgroundColor: b.accentColor }}
                        />
                        <h3 className="font-heading text-lg leading-none">
                          {b.name}
                        </h3>
                        <p className="mt-2 text-xs text-muted-foreground">
                          {b.slogan}
                        </p>
                        <span className="mt-4 inline-block text-xs text-accent transition-transform group-hover:translate-x-0.5">
                          보러가기 →
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
              컬렉션
            </Link>
            <Link
              to="/pages/about"
              className="py-2 transition-colors hover:text-accent"
            >
              About
            </Link>
          </nav>

          {/* RIGHT — Icons */}
          <div className="flex items-center gap-4">
            <button
              aria-label="Search"
              className="hidden p-1.5 transition-colors hover:text-accent md:inline-flex"
            >
              <Search size={18} />
            </button>
            <button
              aria-label="Wishlist"
              className="hidden p-1.5 transition-colors hover:text-accent md:inline-flex"
            >
              <Heart size={18} />
            </button>
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
            <button
              aria-label="Menu"
              onClick={() => setDrawerOpen(true)}
              className="p-1.5 md:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40 animate-fade-in"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-background shadow-xl animate-slide-in-right">
            <div className="flex h-16 items-center justify-between px-5">
              <span
                className="font-heading"
                style={{ fontSize: 20, letterSpacing: "0.05em" }}
              >
                BridgeGroup
              </span>
              <button
                aria-label="Close menu"
                onClick={() => setDrawerOpen(false)}
                className="p-1.5"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col px-5 pt-4 text-sm">
              <button
                className="flex items-center justify-between border-b py-4 text-left"
                onClick={() => setMobileBrandsOpen((v) => !v)}
                aria-expanded={mobileBrandsOpen}
              >
                <span>브랜드</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${mobileBrandsOpen ? "rotate-180" : ""}`}
                />
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
                      <span
                        className="h-1 w-5 rounded-full"
                        style={{ backgroundColor: b.accentColor }}
                      />
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
                컬렉션
              </Link>
              <Link
                to="/pages/about"
                onClick={() => setDrawerOpen(false)}
                className="border-b py-4"
              >
                About
              </Link>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
