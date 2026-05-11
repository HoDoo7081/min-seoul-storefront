import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import type { CartItem as CartItemType } from "@/lib/types";
import { useLocale } from "@/hooks/useLocale";

const FREE_SHIPPING_THRESHOLD = 50000;
const SHIPPING_FEE = 3000;

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
      className="flex items-start gap-4 border-b py-6 transition-all duration-300 ease-out"
      style={{
        transform: removing ? "translateX(100%)" : "translateX(0)",
        opacity: removing ? 0 : 1,
      }}
    >
      <div className="h-24 w-24 overflow-hidden rounded-lg bg-muted">
        <img src={line.image} alt={line.title} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col">
        <p
          className="text-[11px] uppercase text-muted-foreground"
          style={{ letterSpacing: "0.08em" }}
        >
          {line.brandName}
        </p>
        <p className="mt-0.5 text-[14px] font-medium leading-tight">{line.title}</p>
        <p className="mt-1 text-[13px] text-muted-foreground">{line.variantTitle}</p>
        <p className="mt-2 text-[14px] font-medium">{fmt(line.price)}</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="inline-flex items-stretch overflow-hidden rounded-lg border">
          <button
            aria-label="Decrease"
            className="flex w-9 items-center justify-center transition-colors hover:bg-muted"
            onClick={() => onUpdate(line.quantity - 1)}
          >
            <Minus size={12} />
          </button>
          <span className="flex w-10 items-center justify-center text-[13px]">
            {line.quantity}
          </span>
          <button
            aria-label="Increase"
            className="flex w-9 items-center justify-center transition-colors hover:bg-muted"
            onClick={() => onUpdate(line.quantity + 1)}
          >
            <Plus size={12} />
          </button>
        </div>
        <p className="text-[14px] font-medium">{fmt(line.price * line.quantity)}</p>
        <button
          onClick={handleRemove}
          aria-label="Remove"
          className="inline-flex items-center gap-1 text-[13px] text-muted-foreground transition-colors hover:text-red-500"
        >
          <X size={12} /> {t("cart.delete")}
        </button>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem } = useCart();
  const { formatPrice: fmt, t } = useLocale();
  const shippingFree = totalPrice >= FREE_SHIPPING_THRESHOLD;
  const shipping = items.length === 0 || shippingFree ? 0 : SHIPPING_FEE;
  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);
  const progress = Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100);
  const grandTotal = totalPrice + shipping;

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-[1280px] flex-col items-center justify-center px-5 py-20 text-center md:px-10">
        <ShoppingBag size={64} className="text-muted-foreground/60" strokeWidth={1.25} />
        <h1 className="mt-4 font-heading text-[18px]">{t("cart.empty")}</h1>
        <p className="mt-2 text-[14px] text-muted-foreground">
          {t("cart.empty.sub")}
        </p>
        <Link
          to="/"
          className="mt-6 rounded-btn px-8 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          {t("cart.empty.cta")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1280px] px-5 py-10 md:px-10">
      {/* Header */}
      <header>
        <h1 className="font-heading text-[36px]">장바구니</h1>
        <p className="mt-1 text-[14px] text-muted-foreground">총 {totalItems}개의 상품</p>
        <div className="mt-4 h-px bg-border" />
      </header>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_360px]">
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
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border p-7">
            <h2 className="text-[16px] font-medium">주문 요약</h2>

            <dl className="mt-5 space-y-3 text-[14px]">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">소계</dt>
                <dd>{fmt(totalPrice)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">배송비</dt>
                <dd>{shippingFree ? "무료" : fmt(SHIPPING_FEE)}</dd>
              </div>
              {!shippingFree && (
                <div>
                  <p className="text-[12px] text-muted-foreground">
                    {fmt(remainingForFree)} 더 담으면 무료배송!
                  </p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full transition-[width] duration-300"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: "var(--color-accent)",
                      }}
                    />
                  </div>
                </div>
              )}
            </dl>

            <div className="my-5 h-px bg-border" />

            <div className="flex items-baseline justify-between text-[18px] font-semibold">
              <span>총 주문금액</span>
              <span>{fmt(grandTotal)}</span>
            </div>

            <a
              href="#checkout"
              className="mt-5 flex h-[52px] w-full items-center justify-center rounded-btn text-[15px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              결제하기
            </a>

            <div className="mt-3 text-center">
              <Link
                to="/collections/$brandHandle"
                params={{ brandHandle: "the-mute" }}
                className="text-[13px] text-muted-foreground hover:underline"
              >
                쇼핑 계속하기
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
