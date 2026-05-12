import { ProductCard } from "@/components/common/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { useLocale } from "@/hooks/useLocale";

export function NewArrivals() {
  const { t } = useLocale();
  const { data: products = [] } = useProducts();
  const items = (products.filter((p) => p.isNew).slice(0, 4) ?? []);
  if (items.length === 0) return null;
  return (
    <section className="bg-surface px-5 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1280px]">
        <h2 className="font-heading text-[32px]">{t("home.new.title")}</h2>
        <p className="mt-2 text-[15px] text-muted-foreground">{t("home.new.sub")}</p>
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:gap-x-6">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
