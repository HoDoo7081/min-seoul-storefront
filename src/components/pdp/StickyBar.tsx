import { useEffect, useState } from "react";
import { Loader2, Minus, Plus } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCart } from "@/hooks/useCart";
import { useLocale } from "@/hooks/useLocale";
import { createShopifyCheckout } from "@/lib/shopify";
import { toast } from "sonner";

export function StickyBar({
  product,
  triggerRef,
}: {
  product: Product;
  triggerRef: React.RefObject<HTMLElement | null>;
}) {
  const { addItem, toggleDrawer } = useCart();
  const { formatPrice: fmt, t, tr } = useLocale();
  const [visible, setVisible] = useState(false);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const imageUrl = variant?.image?.url ?? product.images[0]?.url ?? "";

  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [triggerRef]);

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
      image: imageUrl,
      quantity: qty,
    });
    setTimeout(() => {
      setLoading(false);
      toggleDrawer(true);
    }, 350);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center gap-4 px-5 py-3 md:px-10">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={tr(product.title)}
            className="h-12 w-12 flex-shrink-0 rounded-md object-cover"
          />
        ) : (
          <div className="h-12 w-12 flex-shrink-0 rounded-md bg-muted" />
        )}
        <div className="hidden min-w-0 flex-1 md:block">
          <p className="truncate text-[14px] font-medium">{tr(product.title)}</p>
          <p className="text-[13px] text-muted-foreground">{fmt(variant?.price ?? product.price)}</p>
        </div>

        {product.variants.length > 1 && (
          <div className="hidden items-center gap-2 md:flex">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setVariantId(v.id)}
                disabled={!v.available}
                className={`rounded-full px-3 py-1 text-[12px] transition-all ${
                  !v.available ? "cursor-not-allowed opacity-40 line-through" : ""
                }`}
                style={{
                  border:
                    v.id === variantId
                      ? "1.5px solid var(--color-primary)"
                      : "1px solid var(--color-border)",
                  backgroundColor:
                    v.id === variantId ? "#f5f5f3" : "var(--color-background)",
                }}
              >
                {tr(v.title)}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center rounded-md border">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="flex w-8 items-center justify-center py-2 transition-colors hover:bg-muted"
            aria-label="Decrease quantity"
          >
            <Minus size={14} />
          </button>
          <span className="w-8 text-center text-[14px]">{qty}</span>
          <button
            onClick={() => setQty(Math.min(10, qty + 1))}
            className="flex w-8 items-center justify-center py-2 transition-colors hover:bg-muted"
            aria-label="Increase quantity"
          >
            <Plus size={14} />
          </button>
        </div>

        <button
          onClick={onAdd}
          disabled={loading || !variant?.available}
          className="flex h-11 flex-1 items-center justify-center rounded-md bg-primary px-6 text-[14px] font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50 md:flex-none md:min-w-[180px]"
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
    </div>
  );
}
