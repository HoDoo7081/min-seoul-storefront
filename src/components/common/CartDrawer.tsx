import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useLocale } from "@/hooks/useLocale";
import { createShopifyCheckout } from "@/lib/shopify";
import { toast } from "sonner";

export function CartDrawer() {
  const { formatPrice: fmt, t } = useLocale();
  const {
    items,
    isOpen,
    totalItems,
    totalPrice,
    toggleDrawer,
    updateQuantity,
    removeItem,
  } = useCart();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setCheckoutLoading(true);
    try {
      const lines = items.map((item) => ({
        merchandiseId: item.variantId,
        quantity: item.quantity,
      }));
      const url = await createShopifyCheckout(lines);
      if (url) {
        toggleDrawer(false);
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        toast.error("결제 페이지를 열 수 없습니다.");
      }
    } catch {
      toast.error("오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-[60] ${isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      {/* Overlay */}
      <div
        onClick={() => toggleDrawer(false)}
        className="absolute inset-0 bg-black/45 transition-opacity duration-300"
        style={{ opacity: isOpen ? 1 : 0 }}
      />

      {/* Drawer */}
      <aside
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-2xl"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s ease",
        }}
        role="dialog"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="font-heading text-xl">
            {t("cart.title")}
            {totalItems > 0 && (
              <span className="ml-2 text-sm text-muted-foreground">
                ({totalItems})
              </span>
            )}
          </h2>
          <button
            aria-label="Close cart"
            onClick={() => toggleDrawer(false)}
            className="p-1.5 transition-colors hover:text-accent"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <p className="text-sm text-muted-foreground">
              {t("cart.drawer.empty")}
            </p>
            <button
              onClick={() => toggleDrawer(false)}
              className="mt-6 rounded-btn border border-foreground px-5 py-2.5 text-sm transition-colors hover:bg-foreground hover:text-background"
            >
              {t("cart.continue")}
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y overflow-y-auto px-5">
              {items.map((line) => (
                <li key={line.variantId} className="flex gap-4 py-5">
                  <div className="h-24 w-20 overflow-hidden rounded-card bg-muted">
                    <img
                      src={line.image}
                      alt={line.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                        {line.brandName}
                      </p>
                      <p className="font-heading text-base leading-tight">
                        {line.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {line.variantTitle}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center rounded-btn border text-sm">
                        <button
                          aria-label="Decrease"
                          className="px-2 py-1.5"
                          onClick={() =>
                            updateQuantity(line.variantId, line.quantity - 1)
                          }
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-7 text-center">{line.quantity}</span>
                        <button
                          aria-label="Increase"
                          className="px-2 py-1.5"
                          onClick={() =>
                            updateQuantity(line.variantId, line.quantity + 1)
                          }
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        aria-label="Remove"
                        onClick={() => removeItem(line.variantId)}
                        className="p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right text-sm font-medium">
                    {fmt(line.price * line.quantity)}
                  </div>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className="border-t bg-surface px-5 py-5">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">{t("cart.drawer.subtotal")}</span>
                <span className="font-heading text-2xl">{fmt(totalPrice)}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {t("cart.drawer.note")}
              </p>
              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="mt-4 block w-full rounded-btn bg-foreground py-3 text-center text-sm font-medium text-background transition-colors hover:bg-foreground/90 disabled:opacity-50"
              >
                {checkoutLoading ? "처리 중..." : t("cart.checkout")}
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
