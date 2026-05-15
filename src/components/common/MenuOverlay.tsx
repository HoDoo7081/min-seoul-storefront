import { Link } from "@tanstack/react-router";
import { X, Instagram, Facebook } from "lucide-react";
import aestheinImg from "@/assets/products/essence-card.jpg";
import gicleeImg from "@/assets/products/giclee-cream-card.jpg";
import theMuteImg from "@/assets/products/dolido-toner-card.jpg";

const NAV_ITEMS = [
  { label: "Products", to: "/collections/$brandHandle" as const, params: { brandHandle: "all" } },
  { label: "About", to: "/pages/about" as const },
  { label: "Contact", to: "/pages/contact" as const },
];

const CARDS = [
  {
    label: "Aesthein",
    image: aestheinImg,
    to: "/collections/$brandHandle" as const,
    params: { brandHandle: "aesthein" },
  },
  {
    label: "Giclée",
    image: gicleeImg,
    to: "/collections/$brandHandle" as const,
    params: { brandHandle: "giclee" },
  },
  {
    label: "The Mute",
    image: theMuteImg,
    to: "/collections/$brandHandle" as const,
    params: { brandHandle: "the-mute" },
  },
];

export function MenuOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 animate-fade-in bg-background">
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        className="flex items-center gap-2 px-5 py-5 text-[12px] font-medium uppercase tracking-widest md:px-10"
      >
        <X size={16} />
        Close
      </button>

      {/* Body */}
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-5 pb-16 pt-4 md:grid-cols-[260px_1fr] md:gap-10 md:px-10 md:pt-6">
        {/* Heading + Nav (tightly grouped) */}
        <div className="flex items-start gap-10 md:gap-12">
          <h2 className="font-heading text-[28px] leading-[1.1] tracking-tight md:text-[32px]">
            Home
            <br />
            Products
          </h2>

          <nav className="flex flex-col pt-1">
            {NAV_ITEMS.map((n) =>
              "params" in n ? (
                <Link
                  key={n.label}
                  to={n.to}
                  params={n.params}
                  onClick={onClose}
                  className="py-1.5 text-[14px] text-foreground transition-opacity hover:opacity-60"
                >
                  {n.label}
                </Link>
              ) : (
                <Link
                  key={n.label}
                  to={n.to}
                  onClick={onClose}
                  className="py-1.5 text-[14px] text-foreground transition-opacity hover:opacity-60"
                >
                  {n.label}
                </Link>
              ),
            )}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="text-foreground transition-opacity hover:opacity-60"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-foreground transition-opacity hover:opacity-60"
              >
                <Facebook size={18} />
              </a>
            </div>
          </nav>
        </div>

        {/* Brand cards */}
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {CARDS.map((c) => (
            <Link
              key={c.label}
              to={c.to}
              params={c.params}
              onClick={onClose}
              className="group relative block aspect-[4/5] overflow-hidden rounded-[6px] bg-muted"
            >
              <img
                src={c.image}
                alt={c.label}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-transparent" />
              <div className="absolute bottom-3 left-3 text-background md:bottom-4 md:left-4">
                <div className="text-[14px] font-medium leading-tight md:text-[16px]">
                  {c.label}
                </div>
                <div className="mt-0.5 text-[11px] opacity-90">Shop Now ›</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
