import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import type { CartItem as CartItemType } from "@/lib/types";
import { useLocale } from "@/hooks/useLocale";
import { createShopifyCheckout } from "@/lib/shopify";
import { toast } from "sonner";

const FREE_SHIPPING_THRESHOLD = 50;   // USD $50
const SHIPPING_FEE = 8;               // USD $8

function Row({
  line,
  onUpdate,
  onRemove,
}: {
  line: CartItemType;
  onUpdate: (q: number) => void;
  onRemove: () => void;
}) {
  const [removing, setRemoving] = useState(false);
  const { formatPrice: fmt, t } = useLocale();

  const handleRemove = () => {
    setRemoving(true);
    window.setTimeout(onRemove, 280);
  };

  return (
    <div
      className="grid grid-cols-[96px_1fr_auto] gap-5 border-b border-border/60 py-7 transition-all duration-300 ease-out md:grid-cols-[120px_1fr_auto] md:gap-7"
      style={{
        transform: removing ? "translateX(40px)" : "translateX(0)",
        opacity: removing ? 0 : 1,
      }}
    >
      <div className="aspect-square overflow-hidden bg-[#f4f6f9]">
        <img
          src={line.image || "https://placehold.co/120x120/f4f6f9/999?text=IMG"}
          alt={line.title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/120x120/f4f6f9/999?text=IMG";
          }}
        />
      </div>

      <div className="flex min-w-0 flex-col">
        <p
          className="text-[10px] uppercase text-[#7aa6d6]"
          style={{ letterSpacing: "0.14em" }}
        >
          {line.brandName}
        </p>
        <p className="mt-1 truncate text-[15px] font-medium leading-snug md:text-[16px]">
          {line.title}
        </p>
        <p className="mt-0.5 text-[13px] text-muted-foreground">{line.variantTitle}</p>

        <div className="mt-auto flex items-center gap-4 pt-4">
          <div className="inline-flex items-center rounded-full border border-border/80">
            <button
              aria-label="Decrease"
              className="flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => onUpdate(line.quantity - 1)}
            >
              <Minus size={13} />
            </button>
            <span className="w-7 text-center text-[13px] tabular-nums">
              {line.quantity}
            </span>
            <button
              aria-label="Increase"
              className="flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => onUpdate(line.quantity + 1)}
            >
              <Plus size={13} />
            </button>
          </div>
          <button
            onClick={handleRemove}
            aria-label="Remove"
            className="inline-flex items-center gap-1 text-[12px] text-muted-foreground transition-colors hover:text-foreground"
          >
            <X size={13} /> {t("cart.delete")}
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between text-right">
        <p className="text-[15px] font-medium tabular-nums md:text-[16px]">
          {fmt(line.price * line.quantity)}
        </p>
        <p className="text-[12px] text-muted-foreground tabular-nums">
          {fmt(line.price)}
        </p>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();
  const { formatPrice: fmt, t } = useLocale();
  const shippingFree = totalPrice >= FREE_SHIPPING_THRESHOLD;
  const shipping = items.length === 0 || shippingFree ? 0 : SHIPPING_FEE;
  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);
  const progress = Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100);
  const grandTotal = totalPrice + shipping;
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
        window.location.href = url;
      } else {
        toast.error("Unable to open checkout. Please try again shortly.");
      }
    } catch (e) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-[640px] flex-col items-center justify-center px-5 py-20 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f4f6f9]">
          <ShoppingBag size={32} className="text-[#7aa6d6]" strokeWidth={1.25} />
        </div>
        <h1 className="mt-6 font-heading text-[24px] tracking-tight md:text-[28px]">
          {t("cart.empty")}
        </h1>
        <p className="mt-2 max-w-sm text-[14px] text-muted-foreground">
          {t("cart.empty.sub")}
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-foreground px-10 text-[14px] font-medium text-background transition-opacity hover:opacity-90"
        >
          {t("cart.empty.cta")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-12 md:px-10 md:py-16">
      {/* Breadcrumb */}
      <nav className="text-[12px] text-muted-foreground" style={{ letterSpacing: "0.06em" }}>
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{t("cart.title")}</span>
      </nav>

      {/* Header */}
      <header className="mt-4 flex items-end justify-between border-b border-border/60 pb-6">
        <h1 className="font-heading text-[36px] tracking-tight md:text-[44px]">
          {t("cart.title")}
        </h1>
        <p className="pb-2 text-[13px] text-muted-foreground">
          {t("cart.count").replace("{n}", String(totalItems))}
        </p>
      </header>

      <div className="mt-2 grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-16">
        {/* Items */}
        <div>
          {items.map((line) => (
            <Row
              key={line.variantId}
              line={line}
              onUpdate={(q) => updateQuantity(line.variantId, q)}
              onRemove={() => removeItem(line.variantId)}
            />
          ))}

          <div className="mt-8">
            <Link
              to="/collections/$brandHandle"
              params={{ brandHandle: "the-mute" }}
              className="inline-flex items-center gap-2 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              ← {t("cart.continue")}
            </Link>
          </div>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl bg-[#f4f6f9] p-8">
            <h2 className="text-[12px] uppercase text-muted-foreground" style={{ letterSpacing: "0.16em" }}>
              {t("cart.summary")}
            </h2>

            {!shippingFree && (
              <div className="mt-5 rounded-2xl bg-background/70 p-4">
                <p className="text-[12px] text-foreground/80">
                  {t("cart.freeRemain").replace("{amount}", fmt(remainingForFree))}
                </p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border/60">
                  <div
                    className="h-full rounded-full bg-[#7aa6d6] transition-[width] duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            <dl className="mt-6 space-y-3 text-[14px]">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">{t("cart.subtotal")}</dt>
                <dd className="tabular-nums">{fmt(totalPrice)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">{t("cart.shipping")}</dt>
                <dd className="tabular-nums">
                  {shippingFree ? t("cart.free") : fmt(SHIPPING_FEE)}
                </dd>
              </div>
            </dl>

            <div className="my-6 h-px bg-border/70" />

            <div className="flex items-baseline justify-between">
              <span className="text-[14px] text-muted-foreground">{t("cart.total")}</span>
              <span className="font-heading text-[24px] tabular-nums">{fmt(grandTotal)}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={checkoutLoading || items.length === 0}
              className="mt-6 flex h-[54px] w-full items-center justify-center rounded-full bg-foreground text-[14px] font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {checkoutLoading ? "Processing..." : t("cart.checkout")}
            </button>

            <p className="mt-4 text-center text-[11px] text-muted-foreground" style={{ letterSpacing: "0.04em" }}>
              Secure checkout · Free returns within 30 days
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
