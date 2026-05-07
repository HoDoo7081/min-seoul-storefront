import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/mockProducts";
import { Badge } from "./Badge";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to="/products/$handle" params={{ handle: product.handle }} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-muted">
        <img src={product.images[0]} alt={product.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        {product.badge && <div className="absolute left-3 top-3"><Badge>{product.badge}</Badge></div>}
        {product.compareAtPrice && (
          <div className="absolute right-3 top-3"><Badge className="border-foreground text-foreground">Sale</Badge></div>
        )}
      </div>
      <div className="mt-4 space-y-1">
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{product.brandName}</p>
        <h3 className="font-heading text-lg leading-snug">{product.title}</h3>
        <p className="text-xs text-muted-foreground">{product.subtitle}</p>
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-sm font-medium">${product.price}</span>
          {product.compareAtPrice && <span className="text-xs text-muted-foreground line-through">${product.compareAtPrice}</span>}
        </div>
      </div>
    </Link>
  );
}
