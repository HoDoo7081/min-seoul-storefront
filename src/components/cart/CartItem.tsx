import { Link } from "@tanstack/react-router";
import type { CartItem as CartItemType } from "@/lib/types";
import { useLocale } from "@/hooks/useLocale";

export function CartItem({
  line,
  onUpdate,
  onRemove,
}: {
  line: CartItemType;
  onUpdate: (q: number) => void;
  onRemove: () => void;
}) {
  const { formatPrice: fmt } = useLocale();
  const handle: string | undefined = undefined;
  return (
    <div className="flex gap-5 border-b py-6">
      {handle ? (
        <Link
          to="/products/$handle"
          params={{ handle }}
          className="h-28 w-24 overflow-hidden rounded-card bg-muted"
        >
          <img src={line.image} alt={line.title} className="h-full w-full object-cover" />
        </Link>
      ) : (
        <div className="h-28 w-24 overflow-hidden rounded-card bg-muted">
          <img src={line.image} alt={line.title} className="h-full w-full object-cover" />
        </div>
      )}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
            {line.brandName}
          </p>
          {handle ? (
            <Link
              to="/products/$handle"
              params={{ handle }}
              className="font-heading text-lg leading-tight"
            >
              {line.title}
            </Link>
          ) : (
            <span className="font-heading text-lg leading-tight">{line.title}</span>
          )}
          <p className="text-xs text-muted-foreground">{line.variantTitle}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center rounded-btn border text-sm">
            <button
              className="px-3 py-1.5"
              onClick={() => onUpdate(Math.max(0, line.quantity - 1))}
            >
              −
            </button>
            <span className="w-8 text-center">{line.quantity}</span>
            <button className="px-3 py-1.5" onClick={() => onUpdate(line.quantity + 1)}>
              +
            </button>
          </div>
          <button
            onClick={onRemove}
            className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="text-right text-sm font-medium">
        {fmt(line.price * line.quantity)}
      </div>
    </div>
  );
}
