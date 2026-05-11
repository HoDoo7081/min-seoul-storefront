import { Link } from "@tanstack/react-router";
import type { Brand } from "@/lib/types";
import { useLocale } from "@/hooks/useLocale";

export function BrandCard({ brand }: { brand: Brand }) {
  const { tr } = useLocale();
  return (
    <article className="overflow-hidden rounded-card border bg-surface">
      <div className="aspect-[4/3] overflow-hidden">
        <img src={brand.coverImage} alt={brand.name} className="h-full w-full object-cover" />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: brand.accentColor }}
          />
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
            {tr(brand.slogan)}
          </p>
        </div>
        <h3 className="mt-2 font-heading text-2xl">{brand.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{tr(brand.description)}</p>
        <Link
          to="/collections/$brandHandle"
          params={{ brandHandle: brand.handle }}
          className="mt-4 inline-block text-sm text-accent"
        >
          Shop {brand.name} →
        </Link>
      </div>
    </article>
  );
}
