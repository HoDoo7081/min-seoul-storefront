import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import type { Product } from "@/lib/types";
import { useCart } from "@/hooks/useCart";

const fmt = (n: number) => `₩${n.toLocaleString("ko-KR")}`;

export function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const { add } = useCart();
  const [hover, setHover] = useState(false);
  const [added, setAdded] = useState(false);

  const primary = product.images[0];
  const secondary = product.images[1];

  const onCardClick = () => {
    navigate({ to: "/products/$handle", params: { handle: product.handle } });
  };

  const onAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const variant = product.variants[0];
    add({
      productId: product.id,
      variantId: variant.id,
      title: product.title,
      variantTitle: variant.title,
      brandName: product.vendor,
      price: variant.price,
      image: variant.image?.url ?? primary.url,
      quantity: 1,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div
      onClick={onCardClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group cursor-pointer overflow-hidden rounded-card bg-surface transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
    >
      {/* IMAGE */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={primary.url}
          alt={primary.altText}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out"
          style={{ transform: hover ? "scale(1.06)" : "scale(1)" }}
        />
        {secondary && (
          <img
            src={secondary.url}
            alt={secondary.altText}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[400ms] ease-out"
            style={{
              opacity: hover ? 1 : 0,
              transform: hover ? "scale(1.06)" : "scale(1)",
              transitionProperty: "opacity, transform",
            }}
          />
        )}

        {/* Badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
          {product.isNew && (
            <span
              className="bg-foreground px-2 py-1 text-[11px] font-medium text-background"
              style={{ letterSpacing: "0.1em" }}
            >
              NEW
            </span>
          )}
          {product.isBestSeller && (
            <span
              className="px-2 py-1 text-[11px] font-medium text-white"
              style={{
                backgroundColor: "var(--color-accent)",
                letterSpacing: "0.1em",
              }}
            >
              BEST
            </span>
          )}
        </div>

        {/* Hover overlay button */}
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
            className="w-full rounded-btn bg-black/75 px-4 py-2.5 text-[13px] font-medium text-white backdrop-blur-sm transition-colors hover:bg-black/85"
          >
            {added ? "✓ 담겼습니다" : "장바구니 담기"}
          </button>
        </div>
      </div>

      {/* INFO */}
      <div className="p-4">
        <p
          className="text-[11px] uppercase text-muted-foreground"
          style={{ letterSpacing: "0.08em" }}
        >
          {product.vendor}
        </p>
        <Link
          to="/products/$handle"
          params={{ handle: product.handle }}
          onClick={(e) => e.stopPropagation()}
          className="mt-1 block text-[14px] font-medium leading-[1.4] text-foreground"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.title}
        </Link>
        <div className="mt-2 flex items-baseline">
          <span className="text-[16px] font-medium">{fmt(product.price)}</span>
          {product.compareAtPrice && (
            <span className="ml-1.5 text-[13px] text-muted-foreground line-through">
              {fmt(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
