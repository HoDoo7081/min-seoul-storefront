import { HeroBanner } from "@/components/home/HeroBanner";
import { BrandStrip } from "@/components/home/BrandStrip";
import { BestSellers } from "@/components/home/BestSellers";
import { NewArrivals } from "@/components/home/NewArrivals";
import { BrandStoryCTA } from "@/components/home/BrandStoryCTA";

// Note: GNB and Footer are mounted globally in src/routes/__root.tsx,
// so they wrap every page including this one.
export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <BrandStrip />
      <BestSellers />
      <NewArrivals />
      <BrandStoryCTA />
    </>
  );
}
