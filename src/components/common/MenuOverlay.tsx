import { Link } from "@tanstack/react-router";
import { X, Instagram, Facebook } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import aestheinImg from "@/assets/products/essence-card.jpg";
import gicleeImg from "@/assets/products/giclee-cream-card.jpg";
import theMuteImg from "@/assets/products/dolido-toner-card.jpg";
import sungboonImg from "@/assets/home/hero4-product.png.asset.json";

export function MenuOverlay({ onClose }: { onClose: () => void }) {
  const { t } = useLocale();
  const NAV_ITEMS = [
    { label: t("nav.products"), to: "/collections/$brandHandle" as const, params: { brandHandle: "all" } },
    { label: t("nav.about"), to: "/pages/about" as const },
    { label: t("nav.contact"), to: "/pages/contact" as const },
  ];
  const CARDS = [
    { label: "Sungboon Edition", image: sungboonImg.url, to: "/collections/$brandHandle" as const, params: { brandHandle: "sungboon-edition" } },
    { label: "Aesthein", image: aestheinImg, to: "/collections/$brandHandle" as const, params: { brandHandle: "aesthein" } },
    { label: "Giclée",   image: gicleeImg,   to: "/collections/$brandHandle" as const, params: { brandHandle: "giclee" } },
    { label: "The Mute", image: theMuteImg,  to: "/collections/$brandHandle" as const, params: { brandHandle: "the-mute" } },
  ];
  const homeProductsLines = t("menu.homeProducts").split("\n");
  return (
    <div className="fixed inset-0 z-50 animate-fade-in bg-background">
      <button
        type="button"
        onClick={onClose}
        className="flex items-center gap-2 px-5 py-5 text-[12px] font-medium uppercase tracking-widest md:px-10"
      >
        <X size={16} />
        {t("menu.close")}
      </button>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-5 pb-16 pt-4 md:grid-cols-[260px_1fr] md:gap-10 md:px-10 md:pt-6">
        <div className="flex items-start gap-10 md:gap-12">
          <h2 className="font-heading text-[28px] leading-[1.1] tracking-tight md:text-[32px]">
            {homeProductsLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < homeProductsLines.length - 1 && <br />}
              </span>
            ))}
          </h2>

          <nav className="flex flex-col pt-1">
            {NAV_ITEMS.map((n) =>
              "params" in n ? (
                <Link key={n.label} to={n.to} params={n.params} onClick={onClose}
                  className="py-1.5 text-[14px] text-foreground transition-opacity hover:opacity-60">
                  {n.label}
                </Link>
              ) : (
                <Link key={n.label} to={n.to} onClick={onClose}
                  className="py-1.5 text-[14px] text-foreground transition-opacity hover:opacity-60">
                  {n.label}
                </Link>
              ),
            )}
            <div className="mt-6 flex items-center gap-3">
              <a href="#" aria-label="Instagram" className="text-foreground transition-opacity hover:opacity-60">
                <Instagram size={18} />
              </a>
              <a href="#" aria-label="Facebook" className="text-foreground transition-opacity hover:opacity-60">
                <Facebook size={18} />
              </a>
            </div>
          </nav>
        </div>

        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {CARDS.map((c) => (
            <Link key={c.label} to={c.to} params={c.params} onClick={onClose}
              className="group relative block aspect-[3/4] max-h-[58vh] overflow-hidden rounded-[8px] bg-muted">
              <img src={c.image} alt={c.label}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-transparent" />
              <div className="absolute bottom-3 left-3 text-background md:bottom-4 md:left-4">
                <div className="text-[14px] font-medium leading-tight md:text-[16px]">{c.label}</div>
                <div className="mt-0.5 text-[11px] opacity-90">{t("menu.shopNow")}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
