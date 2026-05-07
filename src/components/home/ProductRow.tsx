import { ProductCard } from "@/components/common/ProductCard";
import type { Product } from "@/data/mockProducts";

export function ProductRow({ title, eyebrow, products }: { title: string; eyebrow?: string; products: Product[] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8">
        {eyebrow && <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{eyebrow}</p>}
        <h2 className="mt-2 font-heading text-4xl">{title}</h2>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
