import { useEffect, useState } from "react";
import { X, Minus, Plus, Loader2, Heart } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/types";
import { useCart } from "@/hooks/useCart";
import { useLocale } from "@/hooks/useLocale";
import { getLocalImages } from "@/lib/productImages";

export function QuickView({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const { addItem, toggleDrawer } = useCart();
  const { formatPrice: fmt, t, tr } = useLocale();
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");
  const [qty, setQty] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleVariantChange = (id: string) => {
    setVariantId(id);
    const v = product.variants.find((x) => x.id === id);
    if (v?.image?.url) {
      const idx = product.images.findIndex((img) => img.url === v.image!.url);
      if (idx !== -1) setImgIdx(idx);
    }
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
      image: variant.image?.url ?? product.images[0]?.url ?? "",
      quantity: qty,
    });
    setTimeout(() => {
      setLoading(false);
      toggleDrawer(true);
      onClose();
    }, 350);
  };

  const onSale =
    !!product.compareAtPrice && product.compareAtPrice > product.price;

  const localImgs = getLocalImages(product.handle);
  const displayImages = localImgs
    ? [
        { url: localImgs[0], altText: product.title },
        ...(localImgs[1] ? [{ url: localImgs[1], altText: product.title }] : []),
      ]
    : product.images.length > 0
    ? product.images
    : [{ url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'><rect width='1' height='1' fill='%23f5f5f5'/></svg>", altText: "" }];
  const currentImg = displayImages[imgIdx] ?? displayImages[0];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4 animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-full max-w-[820px] flex-col overflow-hidden rounded-2xl bg-background shadow-2xl md:flex-row"
        style={{ maxHeight: "90vh" }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 rounded-full bg-background/80 p-2 backdrop-blur transition-colors hover:bg-muted"
        >
          <X size={18} />
        </button>

        {/* 이미지 영역 */}
        <div className="md:w-1/2 bg-muted">
          <div className="relative aspect-square">
            {currentImg ? (
              <img
                src={currentImg.url}
                alt={currentImg.altText ?? titleStr}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : null}
            {product.images.length > 1 && (
              <div className="absolute bottom-3 left-3 flex gap-2">
                {product.images.slice(0, 5).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className="overflow-hidden rounded-md transition-all"
                    style={{
                      width: 40,
                      height: 40,
                      border: `1.5px solid ${i === imgIdx ? "var(--color-primary)" : "transparent"}`,
                      opacity: i === imgIdx ? 1 : 0.65,
                    }}
                  >
                    <img src={img.url} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 정보 영역 */}
        <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-6 md:w-1/2">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            {product.vendor}
          </p>

          <h2 className="font-heading text-[22px] leading-tight">{titleStr}</h2>

          <div className="flex items-baseline gap-2">
            <span className="text-[18px] font-medium">{fmt(variant?.price ?? product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-[13px] text-muted-foreground line-through">
                {fmt(product.compareAtPrice)}
              </span>
            )}
            {onSale && (
              <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-white">
                SALE
              </span>
            )}
          </div>

          {product.shortDescription && (
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              {tr(product.shortDescription)}
            </p>
          )}

          <div className="my-1 h-px bg-border" />

          {product.variants.length > 1 && (
            <div className="flex flex-col gap-2">
              <p className="text-[12px] text-muted-foreground">
                {tr(product.options?.[0]?.name ?? "옵션")}: {tr(variant?.title ?? "")}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => handleVariantChange(v.id)}
                    disabled={!v.available}
                    className={`rounded-full px-4 py-1.5 text-[12px] transition-all ${
                      !v.available ? "cursor-not-allowed line-through opacity-40" : ""
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
            </div>
          )}

          <div className="flex w-fit items-center rounded-md border">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="flex w-9 items-center justify-center py-2 transition-colors hover:bg-muted"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="w-9 text-center text-[14px]">{qty}</span>
            <button
              onClick={() => setQty(Math.min(10, qty + 1))}
              className="flex w-9 items-center justify-center py-2 transition-colors hover:bg-muted"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            onClick={onAdd}
            disabled={loading || !variant?.available}
            className="flex h-11 w-full items-center justify-center rounded-md bg-primary px-6 text-[14px] font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : variant?.available ? (
              t("pdp.addToCart")
            ) : (
              t("pdp.soldOut")
            )}
          </button>

          <button className="flex h-11 w-full items-center justify-center gap-2 rounded-md border text-[14px] font-medium transition-colors hover:bg-muted">
            <Heart size={14} />
            {t("pdp.wishlist")}
          </button>

          <Link
            to="/products/$handle"
            params={{ handle: product.handle }}
            onClick={onClose}
            className="text-center text-[13px] text-accent hover:underline"
          >
            {t("pdp.viewFull") ?? "상세 페이지 보기 →"}
          </Link>
        </div>
      </div>
    </div>
  );
}
