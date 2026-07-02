import type { ProductVariant } from "@/lib/types";
import { useLocale } from "@/hooks/useLocale";

export function VariantSelector({
  variants,
  value,
  onChange,
  label,
}: {
  variants: ProductVariant[];
  value: string;
  onChange: (id: string) => void;
  label?: string;
}) {
  const { tr, t } = useLocale();
  return (
    <div>
      <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
        {label ?? t("pdp.option")}
      </p>
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => (
          <button
            key={v.id}
            disabled={!v.available}
            onClick={() => onChange(v.id)}
            className={`rounded-btn border px-4 py-2 text-sm transition-all ${value === v.id ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"} ${!v.available && "cursor-not-allowed opacity-40 line-through"}`}
          >
            {tr(v.title)}
          </button>
        ))}
      </div>
    </div>
  );
}
