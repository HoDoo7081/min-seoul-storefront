import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCart } from "@/hooks/useCart";
import { useLocale } from "@/hooks/useLocale";
import { QuickView } from "@/components/common/QuickView";
import { getLocalImages } from "@/lib/productImages";

export function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const { addItem, toggleDrawer } = useCart();
  const { formatPrice: fmt, t, tr } = useLocale();
  const [hover, setHover] = useState(false);
  const [added, setAdded] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const PLACEHOLDER = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'><rect width='1' height='1' fill='%23f5f5f5'/></svg>";
  const localImgs = getLocalImages(product.handle);
  const primary   = localImgs
    ? { url: localImgs[0], altText: tr(product.title) }
    : (product.images[0] ?? { url: PLACEHOLDER, altText: "" });
  const secondary = localImgs?.[1]
    ? { url: localImgs[1], altText: tr(product.title) }
    : product.images[1];
  const title = tr(product.title);

  const onCardClick = () => {
    navigate({ to: "/products/$handle", params: { handle: product.handle } });
  };

  const onAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const variant = product.variants[0];
    addItem({
      productId: product.id,
      variantId: variant.id,
      title,
      variantTitle: tr(variant.title),
      brandName: product.vendor,
      price: variant.price,
      image: variant.image?.url ?? primary.url,
      quantity: 1,
    });
    toggleDrawer(true);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div
      onClick={onCardClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden border border-border bg-white">
        <Link
          to="/products/$handle"
          params={{ handle: product.handle }}
          aria-label={title}
          onClick={(e) => e.stopPropagation()}
          className="absolute inset-0 z-10 block"
        />
        <img
          src={primary.url}
          alt={primary.altText}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out"
          style={{ transform: hover ? "scale(1.04)" : "scale(1)" }}
        />
        {secondary && (
          <img
            src={secondary.url}
            alt={secondary.altText}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-[400ms] ease-out"
            style={{
              opacity: hover ? 1 : 0,
              transform: hover ? "scale(1.04)" : "scale(1)",
              transitionProperty: "opacity, transform",
            }}
          />
        )}

        <div className="pointer-events-none absolute left-3 top-3 z-20 flex flex-col gap-1.5">
          {product.isNew && (
            <span
              className="bg-foreground px-2 py-0.5 text-[10px] font-medium text-background"
              style={{ letterSpacing: "0.1em" }}
            >
              NEW
            </span>
          )}
          {product.isBestSeller && (
            <span
              className="border border-foreground bg-white px-2 py-0.5 text-[10px] font-medium text-foreground"
              style={{ letterSpacing: "0.1em" }}
            >
              BEST
            </span>
          )}
        </div>

        <div
          className="absolute inset-x-0 bottom-0 z-10 p-3 transition-all duration-300 ease-out"
          style={{
            opacity: hover ? 1 : 0,
            transform: hover ? "translateY(0)" : "translateY(8px)",
            pointerEvents: hover ? "auto" : "none",
          }}
        >
          <button
            onClick={onAdd}
            className="w-full rounded-full bg-foreground px-4 py-2 text-[12px] font-medium text-background transition-opacity hover:opacity-90"
          >
            {added ? t("pdp.added") : t("pdp.addToCart")}
          </button>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setQuickViewOpen(true);
          }}
          aria-label="Quick view"
          className="absolute bottom-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 shadow-sm transition-all duration-200 hover:scale-105"
          style={{
            opacity: hover ? 1 : 0,
            pointerEvents: hover ? "auto" : "none",
          }}
        >
          <Eye size={14} className="text-foreground" />
        </button>
      </div>

      <div className="pt-3">
        <p
          className="text-[11px] font-medium uppercase"
          style={{ letterSpacing: "0.08em", color: "#7aa6d6" }}
        >
          {product.vendor}
        </p>
        <Link
          to="/products/$handle"
          params={{ handle: product.handle }}
          onClick={(e) => e.stopPropagation()}
          className="mt-1 block text-[13px] font-normal leading-[1.4] text-foreground"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {title}
        </Link>
        <div className="mt-1 flex items-baseline">
          <span className="text-[12px] text-foreground">
            {product.price > 0 ? fmt(product.price) : "$ TBU"}
          </span>
          {product.compareAtPrice && (
            <span className="ml-1.5 text-[11px] text-muted-foreground line-through">
              {fmt(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>

      {quickViewOpen && (
        <QuickView product={product} onClose={() => setQuickViewOpen(false)} />
      )}
    </div>
  );
}
