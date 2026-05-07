type Variant = { id: string; label: string; available: boolean };
export function VariantSelector({ variants, value, onChange }: { variants: Variant[]; value: string; onChange: (id: string) => void }) {
  return (
    <div>
      <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">Option</p>
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => (
          <button
            key={v.id}
            disabled={!v.available}
            onClick={() => onChange(v.id)}
            className={`rounded-btn border px-4 py-2 text-sm transition-all ${value === v.id ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"} ${!v.available && "cursor-not-allowed opacity-40 line-through"}`}
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  );
}
