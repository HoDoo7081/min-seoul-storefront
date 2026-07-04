import { GenericStory } from "./GenericStory";
import serum1 from "@/assets/pdp/apple-peel/serum-1.jpg";
import serum2 from "@/assets/pdp/apple-peel/serum-2.jpg";
import serum3 from "@/assets/pdp/apple-peel/serum-3.jpg";
import mask1 from "@/assets/pdp/apple-peel/mask-1.jpg";
import mask2 from "@/assets/pdp/apple-peel/mask-2.jpg";
import mask3 from "@/assets/pdp/apple-peel/mask-3.jpg";
import bannerProducts from "@/assets/pdp/apple-peel/banner-products.jpg";
import { useLocale } from "@/hooks/useLocale";

export function ApplePeelSetStory({ title }: { title: string }) {
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
          title: "Apple Peel Glow Skin Soothing Serum — 30ml",
          featuresAspect: "1 / 1",
          featuresFit: "cover",
          features: [
            {
              image: serum1,
              title: "Targets 3 Major Pore Concerns · Brightens Complexion",
              body:
                "A concentrated apple extract core targets the three key pore concerns — visibly lifting sagging vertical pores, refining horizontal pores from excess sebum, and brightening dull, melanin-tinted pores for smooth, even-toned skin.",
            },
            {
              image: serum2,
              title: "Precision Renewal · Refines Aging Keratin",
              body:
                "Naturally derived AHA from apple peel gently smooths the surface, sweeping away aged keratin and clarifying the look of enlarged, textured pores so skin feels reset and looks refined.",
            },
            {
              image: serum3,
              title: "Pink Vitamin · Instant Radiant Hydration",
              body:
                "A patented pink vitamin complex fuses the highest-density moisture actives to deliver instant, deep-penetrating hydration — non-sticky, weightless, and finished with a soft, dewy glow.",
            },
          ],
        }}
      />

      {/* Mask block */}
      <GenericStory
        config={{
          title: "Apple Peel Glow Skin Soothing Wash-off Mask — 100g",
          featuresAspect: "1 / 1",
          featuresFit: "cover",
          features: [
            {
              image: mask1,
              title: "Visibly Improves 3 Pore Concerns",
              body:
                "A concentrated apple extract complex targets the three main pore issues — lifting sagging vertical pores, refining stretched horizontal pores, and clarifying dark melanin-tinted pores for a smoother, more even surface.",
            },
            {
              image: mask2,
              title: "Apple AHA · Gentle Keratin Renewal",
              body:
                "Naturally derived AHA from apple peel gently exfoliates the skin surface, dissolving dead cells and blackheads buried deep in pores for an instantly cleaner, clearer complexion.",
            },
            {
              image: mask3,
              title: "Pink Vitamin · Instant Soothing Hydration",
              body:
                "A patented pink vitamin blend with soothing calamine calms hot, sensitized skin and floods it with rich moisture, so skin stays comforted and dewy — never tight after rinsing.",
            },
          ],
        }}
      />
    </>
  );
}
