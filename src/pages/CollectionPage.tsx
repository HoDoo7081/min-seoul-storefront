import { useMemo, useState } from "react";
import { brands } from "@/data/mockBrands";
import { getByBrand } from "@/data/mockProducts";
import { FilterBar } from "@/components/collection/FilterBar";
import { ProductGrid } from "@/components/collection/ProductGrid";

export default function CollectionPage({ brandHandle }: { brandHandle: string }) {
  const brand = brands.find((b) => b.handle === brandHandle);
  const [sort, setSort] = useState("featured");
  const items = useMemo(() => {
    const list = getByBrand(brandHandle).slice();
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [brandHandle, sort]);

  if (!brand) return <div className="mx-auto max-w-7xl px-6 py-20">Brand not found.</div>;

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="aspect-[3/1] w-full">
          <img src={brand.coverImage} alt={brand.name} className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-7xl px-6 pb-10 text-white">
          <p className="text-[11px] uppercase tracking-[0.3em] opacity-80">House</p>
          <h1 className="mt-2 font-heading text-5xl md:text-6xl">{brand.name}</h1>
          <p className="mt-2 max-w-xl text-sm opacity-90">{brand.description}</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <FilterBar sortBy={sort} onSortChange={setSort} count={items.length} />
        <div className="py-10">
          <ProductGrid products={items} />
        </div>
      </div>
    </div>
  );
}
