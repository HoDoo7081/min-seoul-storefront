import { Link } from "@tanstack/react-router";
import { useCart } from "@/hooks/useCart";
import { CartItem } from "@/components/cart/CartItem";
import { OrderSummary } from "@/components/cart/OrderSummary";

export default function CartPage() {
  const { lines, update, remove, subtotal } = useCart();
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="font-heading text-5xl">Your bag</h1>
      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
        <div>
          {lines.length === 0 ? (
            <div className="rounded-card border bg-surface p-12 text-center">
              <p className="text-muted-foreground">Your bag is empty.</p>
              <Link to="/" className="mt-4 inline-block text-accent">Continue shopping →</Link>
            </div>
          ) : (
            lines.map((l) => (
              <CartItem
                key={`${l.productId}-${l.variantId}`}
                line={l}
                onUpdate={(q) => update(l.productId, l.variantId, q)}
                onRemove={() => remove(l.productId, l.variantId)}
              />
            ))
          )}
        </div>
        <OrderSummary subtotal={subtotal} />
      </div>
    </div>
  );
}
