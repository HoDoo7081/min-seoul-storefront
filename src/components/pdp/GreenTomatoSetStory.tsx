import { GenericStory } from "./GenericStory";
import serum1 from "@/assets/pdp/green-tomato/serum-1.jpg";
import serum2 from "@/assets/pdp/green-tomato/serum-2.jpg";
import serum3 from "@/assets/pdp/green-tomato/serum-3.jpg";
import mask1 from "@/assets/pdp/green-tomato/mask-1.jpg";
import mask2 from "@/assets/pdp/green-tomato/mask-2.jpg";
import mask3 from "@/assets/pdp/green-tomato/mask-3.jpg";
import bannerProducts from "@/assets/pdp/green-tomato/banner-products.jpg";
import { useLocale } from "@/hooks/useLocale";

export function GreenTomatoSetStory({ title }: { title: string }) {
  const { tt } = useLocale();
  return (
    <>
      {/* Hero banner */}
      <section className="mx-auto max-w-[1280px] px-5 pt-6 md:px-10">
        <div className="relative aspect-[860/276] w-full overflow-hidden rounded-[2px] bg-muted">
          <img
            src={bannerProducts}
            alt={tt(title)}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute left-[3.5%] top-[13%] z-10 text-[22px] font-semibold leading-none tracking-[0] text-foreground md:text-[28px] lg:text-[30px]">
            {tt(title)}
          </div>
        </div>
      </section>

      {/* Serum block */}
      <GenericStory
        config={{
          title: "Green Tomato Pore Lifting Serum — 30ml",
          featuresAspect: "1 / 1",
          featuresFit: "cover",
          features: [
            {
              image: serum1,
              title: "Pore Tightening & Sebum Balance",
              body:
                "Concentrated green tomato extract targets three major pore concerns — visibly minimizing vertical pores, refining excess sebum, and smoothing enlarged pore texture.",
            },
            {
              image: serum2,
              title: "Deep Cleansing & Impurity Adsorption",
              body:
                "A patented mud complex with natural mineral powders draws out sebum, blackheads and buildup, revealing skin that feels clarified and looks refreshed.",
            },
            {
              image: serum3,
              title: "Soothing Care & Deep Hydration",
              body:
                "An icy-cool hydration blend designed for sensitive skin quickly calms redness and irritation while replenishing moisture, so skin feels comforted and healthy after cleansing.",
            },
          ],
        }}
      />

      {/* Mask block */}
      <GenericStory
        config={{
          title: "Green Tomato Pore Purifying Wash-off Mask — 100g",
          featuresAspect: "1 / 1",
          featuresFit: "cover",
          features: [
            {
              image: mask1,
              title: "All-Round Tightening for 3 Pore Types",
              body:
                "Green tomato extract locks in three core pore concerns — vertical pores caused by elasticity loss, dark pores from oxidized sebum, and rough, uneven skin texture.",
            },
            {
              image: mask2,
              title: "Deep-Cleansing Waste Vacuum",
              body:
                "A powerful mud complex sweeps away stubborn blackheads, sebum and dead skin cells from deep within the pores, leaving skin instantly smoother and clearer.",
            },
            {
              image: mask3,
              title: "Quadruple Centella Cica Comfort",
              body:
                "A 4-CICA Centella complex combined with micro-crystal hydration soothes reactive, sensitized skin and delivers a cooling veil of moisture, so skin never feels tight after rinsing.",
            },
          ],
        }}
      />
    </>
  );
}
