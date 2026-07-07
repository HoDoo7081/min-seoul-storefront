import { Button } from "@/components/common/Button";

export function OrderSummary({ subtotal }: { subtotal: number }) {
  const shipping = subtotal > 80 || subtotal === 0 ? 0 : 8;
  const total = subtotal + shipping;
  return (
    <aside className="rounded-card border bg-surface p-6">
      <h3 className="font-heading text-xl">Order summary</h3>
      <dl className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>${subtotal.toFixed(2)}</dd></div>
        <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</dd></div>
        <div className="mt-3 flex justify-between border-t pt-3 text-base font-medium"><dt>Total</dt><dd>${total.toFixed(2)}</dd></div>
      </dl>
      <Button size="lg" className="mt-6 w-full" disabled={subtotal === 0}>Checkout</Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">Secure checkout via Shopify</p>
      <div className="mt-5 space-y-1.5 rounded-md border border-border/60 bg-background/60 p-3 text-[11px] leading-[1.6] text-muted-foreground">
        <p><strong className="text-foreground">Shipping:</strong> Delivery takes up to 7 business days from dispatch.</p>
        <p><strong className="text-foreground">Returns:</strong> Return shipping is the customer's responsibility (KRW 20,000 / approx. TWD 426), unless the item is defective or incorrectly sent.</p>
      </div>
    </aside>
  );
}
