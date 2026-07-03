import { GenericStory } from "./GenericStory";
import serum1 from "@/assets/pdp/apple-peel/serum-1.jpg";
import serum2 from "@/assets/pdp/apple-peel/serum-2.jpg";
import serum3 from "@/assets/pdp/apple-peel/serum-3.jpg";
import mask1 from "@/assets/pdp/apple-peel/mask-1.jpg";
import mask2 from "@/assets/pdp/apple-peel/mask-2.jpg";
import mask3 from "@/assets/pdp/apple-peel/mask-3.jpg";
import duo from "@/assets/pdp/apple-peel/duo.png";
import { useLocale } from "@/hooks/useLocale";

export function ApplePeelSetStory({ title }: { title: string }) {
  const { tt } = useLocale();
  return (
    <>
      {/* Hero banner */}
      <section className="mx-auto max-w-[1280px] px-5 pt-6 md:px-10">
        <div
          className="relative w-full overflow-hidden rounded-[2px]"
          style={{
            aspectRatio: "16 / 5",
            background:
              "linear-gradient(180deg, #b8bcc0 0%, #d6d9dc 45%, #eef0f2 100%)",
          }}
        >
          <div className="absolute left-6 top-6 z-10 text-[18px] font-semibold tracking-tight text-foreground md:left-10 md:top-10 md:text-[22px]">
            {tt(title)}
          </div>
          <img
            src={duo}
            alt={tt(title)}
            className="absolute inset-y-0 right-0 h-full w-auto object-contain object-right"
          />
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
