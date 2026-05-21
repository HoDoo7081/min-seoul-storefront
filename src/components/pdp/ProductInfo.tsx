import { useState } from "react";
import { Heart, Loader2, Minus, Plus, Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCart } from "@/hooks/useCart";
import { useLocale } from "@/hooks/useLocale";
import { createCheckoutWindow, createShopifyCheckout, openCheckoutUrl } from "@/lib/shopify";
import { toast } from "sonner";

export function ProductInfo({
  product,
  onImageChange,
  onScrollToReviews,
  descriptionOverride,
  titleNode,
  extraBelowDescription,
}: {
  product: Product;
  onImageChange?: (imageUrl: string) => void;
  onScrollToReviews?: () => void;
  descriptionOverride?: string;
  titleNode?: React.ReactNode;
  extraBelowDescription?: React.ReactNode;
}) {
  const { addItem, toggleDrawer } = useCart();
  const { formatPrice: fmt, t, tr } = useLocale();
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const fallbackImage = product.images[0]?.url ?? "";

  const handleVariantChange = (id: string) => {
    setVariantId(id);
    const v = product.variants.find((x) => x.id === id);
    if (v?.image?.url && onImageChange) onImageChange(v.image.url);
  };

  const onAdd = () => {
    if (!variant) return;
    setLoading(true);
    addItem({
      productId: product.id,
      variantId: variant.id,
      title: tr(product.title),
      variantTitle: tr(variant.title),
      brandName: product.vendor,
      price: variant.price,
      image: variant.image?.url ?? fallbackImage,
      quantity: qty,
    });
    window.setTimeout(() => {
      setLoading(false);
      toggleDrawer(true);
    }, 350);
  };

  const onSale = !!product.compareAtPrice && product.compareAtPrice > product.price;

  const [buyLoading, setBuyLoading] = useState(false);

  const onBuyNow = async () => {
    if (!variant) return;
    const checkoutWindow = createCheckoutWindow();
    setBuyLoading(true);
    try {
      const url = await createShopifyCheckout([{ merchandiseId: variant.id, quantity: qty }]);
      if (url) {
        openCheckoutUrl(url, checkoutWindow);
      } else {
        checkoutWindow?.close();
        toast.error("Unable to proceed to checkout. Please try again.");
      }
    } catch {
      checkoutWindow?.close();
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBuyLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Title */}
      <h1 className="text-[22px] font-semibold leading-[1.2] tracking-tight sm:text-[26px] md:text-[32px]">
        {titleNode ?? tr(product.title)}
      </h1>

      {/* Short description */}
      <p className="mt-4 text-[14px] text-muted-foreground" style={{ lineHeight: 1.7 }}>
        {descriptionOverride ?? tr(product.shortDescription)}
      </p>

      {extraBelowDescription}

      {/* Reviews link (subtle) */}
      <button
        type="button"
        onClick={onScrollToReviews}
        className="mt-3 inline-flex items-center gap-1.5 self-start text-[12px] text-muted-foreground hover:text-foreground"
      >
        <Star size={12} fill="currentColor" strokeWidth={0} />
        <span>{product.rating.toFixed(1)}</span>
        <span>·</span>
        <span>{t("pdp.reviewsLabel").replace("{n}", String(product.reviewCount))}</span>
      </button>

      <div className="my-6 h-px bg-border" />

      {/* Price row */}
      <div className="flex items-baseline justify-between">
        <span className="text-[12px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
          Price
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-[20px] font-medium">{fmt(variant?.price ?? product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-[14px] text-muted-foreground line-through">
              {fmt(product.compareAtPrice)}
            </span>
          )}
          {onSale && (
            <span className="ml-1 rounded-sm bg-foreground px-1.5 py-0.5 text-[10px] font-medium text-background">
              SALE
            </span>
          )}
        </div>
      </div>

      {/* Variants */}
      {product.options.map((opt, oi) => (
        <div key={oi} className="mt-5">
          <p className="mb-2 text-[12px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
            {tr(opt.name)}
          </p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => {
              const active = v.id === variantId;
              return (
                <button
                  key={v.id}
                  disabled={!v.available}
                  onClick={() => handleVariantChange(v.id)}
                  className={`rounded-full border px-4 py-1.5 text-[12px] transition-all ${
                    !v.available ? "cursor-not-allowed line-through opacity-40" : ""
                  }`}
                  style={{
                    borderColor: active ? "var(--color-foreground)" : "var(--color-border)",
                    backgroundColor: active ? "var(--color-foreground)" : "transparent",
                    color: active ? "var(--color-background)" : "var(--color-foreground)",
                  }}
                >
                  {tr(v.title)}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Qty + CTA row (Figma style) */}
      <div className="mt-6 flex items-stretch gap-2">
        <div className="flex items-stretch overflow-hidden rounded-full border border-foreground">
          <button
            aria-label="Decrease"
            className="flex w-9 items-center justify-center transition-colors hover:bg-muted"
            onClick={() => setQty(Math.max(1, qty - 1))}
          >
            <Minus size={14} />
          </button>
          <span className="flex w-9 items-center justify-center text-[14px]">{qty}</span>
          <button
            aria-label="Increase"
            className="flex w-9 items-center justify-center transition-colors hover:bg-muted"
            onClick={() => setQty(Math.min(10, qty + 1))}
          >
            <Plus size={14} />
          </button>
        </div>
        <button
          onClick={onAdd}
          disabled={loading || !variant?.available}
          className="flex h-11 flex-1 items-center justify-center rounded-full bg-foreground text-[13px] font-medium uppercase tracking-[0.08em] text-background transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : variant?.available ? (
            t("pdp.addToCart")
          ) : (
            t("pdp.soldOut")
          )}
        </button>
      </div>

      {/* Buy It Now */}
      {variant?.available && (
        <button
          onClick={onBuyNow}
          disabled={buyLoading}
          className="mt-2 flex h-11 w-full items-center justify-center rounded-full border border-foreground bg-background text-[13px] font-medium uppercase tracking-[0.08em] text-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {buyLoading ? <Loader2 size={16} className="animate-spin" /> : "Buy It Now"}
        </button>
      )}

      <button className="mt-3 inline-flex items-center justify-center gap-2 self-start text-[12px] text-muted-foreground hover:text-foreground">
        <Heart size={13} />
        {t("pdp.wishlist")}
      </button>
    </div>
  );
}
