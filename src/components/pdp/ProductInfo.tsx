import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Star, Heart, Loader2, Minus, Plus } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCart } from "@/hooks/useCart";
import { useLocale } from "@/hooks/useLocale";
import { brands } from "@/data/mockBrands";

function StarsRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center" aria-label={`${rating} stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          color="#f4b942"
          fill={n <= Math.round(rating) ? "#f4b942" : "transparent"}
          strokeWidth={1.5}
        />
      ))}
    </span>
  );
}

export function ProductInfo({
  product,
  onImageChange,
  onScrollToReviews,
}: {
  product: Product;
  onImageChange?: (imageUrl: string) => void;
  onScrollToReviews?: () => void;
}) {
  const { addItem, toggleDrawer } = useCart();
  const { formatPrice: fmt } = useLocale();
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const variant = product.variants.find((v) => v.id === variantId)!;
  const accent =
    brands.find((b) => b.handle === product.brandHandle)?.accentColor ??
    "var(--color-foreground)";

  const handleVariantChange = (id: string) => {
    setVariantId(id);
    const v = product.variants.find((x) => x.id === id);
    if (v?.image?.url && onImageChange) onImageChange(v.image.url);
  };

  const onAdd = () => {
    setLoading(true);
    addItem({
      productId: product.id,
      variantId: variant.id,
      title: product.title,
      variantTitle: variant.title,
      brandName: product.vendor,
      price: variant.price,
      image: variant.image?.url ?? product.images[0].url,
      quantity: qty,
    });
    window.setTimeout(() => {
      setLoading(false);
      toggleDrawer(true);
    }, 350);
  };

  const onSale = !!product.compareAtPrice && product.compareAtPrice > product.price;

  return (
    <div className="flex flex-col">
      <Link
        to="/collections/$brandHandle"
        params={{ brandHandle: product.brandHandle }}
        className="text-[12px] uppercase"
        style={{ letterSpacing: "0.1em", color: accent }}
      >
        {product.vendor}
      </Link>
      <h1
        className="mt-1.5 font-heading"
        style={{ fontSize: 28, lineHeight: 1.3 }}
      >
        {product.title}
      </h1>

      <button
        type="button"
        onClick={onScrollToReviews}
        className="mt-2.5 inline-flex items-center gap-2 self-start text-left"
      >
        <StarsRow rating={product.rating} />
        <span className="text-[14px] font-medium">{product.rating.toFixed(1)}</span>
        <span className="text-[13px] text-muted-foreground">
          리뷰 {product.reviewCount}개
        </span>
      </button>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-[24px] font-medium">{fmt(variant.price)}</span>
        {product.compareAtPrice && (
          <span className="text-[16px] text-muted-foreground line-through">
            {fmt(product.compareAtPrice)}
          </span>
        )}
        {onSale && (
          <span className="ml-1 rounded-sm bg-red-600 px-1.5 py-0.5 text-[11px] font-medium text-white">
            SALE
          </span>
        )}
      </div>

      <p
        className="mt-4 text-[15px] text-muted-foreground"
        style={{
          lineHeight: 1.7,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {product.shortDescription}
      </p>

      <div className="my-5 h-px bg-border" />

      {/* Variant selector */}
      {product.options.map((opt) => (
        <div key={opt.name} className="mb-4">
          <p className="mb-2 text-[13px] font-medium">
            {opt.name}: <span className="font-normal">{variant.title}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => {
              const active = v.id === variantId;
              return (
                <button
                  key={v.id}
                  disabled={!v.available}
                  onClick={() => handleVariantChange(v.id)}
                  className={`rounded-full px-[18px] py-2 text-[13px] transition-all ${
                    !v.available ? "cursor-not-allowed line-through opacity-40" : ""
                  }`}
                  style={{
                    border: active
                      ? "1.5px solid var(--color-primary)"
                      : "1px solid var(--color-border)",
                    backgroundColor: active ? "#f5f5f3" : "var(--color-background)",
                  }}
                >
                  {v.title}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Quantity */}
      <div className="mt-6 inline-flex items-stretch self-start overflow-hidden rounded-lg border">
        <button
          aria-label="Decrease"
          className="flex w-10 items-center justify-center transition-colors hover:bg-muted"
          onClick={() => setQty(Math.max(1, qty - 1))}
        >
          <Minus size={14} />
        </button>
        <span className="flex w-12 items-center justify-center text-sm">{qty}</span>
        <button
          aria-label="Increase"
          className="flex w-10 items-center justify-center transition-colors hover:bg-muted"
          onClick={() => setQty(Math.min(10, qty + 1))}
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Add to cart */}
      <button
        onClick={onAdd}
        disabled={loading || !variant.available}
        className="mt-4 flex h-[52px] w-full items-center justify-center rounded-btn text-[15px] font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{
          backgroundColor: "var(--color-primary)",
          letterSpacing: "0.03em",
        }}
      >
        {loading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : variant.available ? (
          "장바구니 담기"
        ) : (
          "품절"
        )}
      </button>

      {/* Wishlist */}
      <button className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-btn border text-[14px] text-muted-foreground transition-colors hover:text-foreground">
        <Heart size={15} />
        위시리스트에 추가
      </button>
    </div>
  );
}
