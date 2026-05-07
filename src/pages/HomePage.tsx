import { HeroBanner } from "@/components/home/HeroBanner";
import { BrandStrip } from "@/components/home/BrandStrip";
import { ProductRow } from "@/components/home/ProductRow";
import { BrandStoryCTA } from "@/components/home/BrandStoryCTA";
import { products } from "@/data/mockProducts";

export default function HomePage() {
  const bestsellers = products.filter((p) => p.badge === "Bestseller").concat(products).slice(0, 4);
  const newArrivals = products.slice().reverse().slice(0, 4);
  return (
    <>
      <HeroBanner />
      <BrandStrip />
      <ProductRow title="Bestsellers" eyebrow="Most loved" products={bestsellers} />
      <BrandStoryCTA />
      <ProductRow title="New arrivals" eyebrow="Just in" products={newArrivals} />
    </>
  );
}
