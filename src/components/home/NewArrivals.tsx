import { ProductCard } from "@/components/common/ProductCard";
import { products } from "@/data/mockProducts";

export function NewArrivals() {
  const items = products.filter((p) => p.isNew).slice(0, 4);
  return (
    <section className="bg-surface px-5 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1280px]">
        <h2 className="font-heading text-[32px]">신제품</h2>
        <p className="mt-2 text-[15px] text-muted-foreground">
          새롭게 출시된 제품을 만나보세요
        </p>
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:gap-x-6">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
