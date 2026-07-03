import { GenericStory } from "./GenericStory";
import serum1 from "@/assets/pdp/green-tomato/serum-1.jpg";
import serum2 from "@/assets/pdp/green-tomato/serum-2.jpg";
import serum3 from "@/assets/pdp/green-tomato/serum-3.jpg";
import mask1 from "@/assets/pdp/green-tomato/mask-1.jpg";
import mask2 from "@/assets/pdp/green-tomato/mask-2.jpg";
import mask3 from "@/assets/pdp/green-tomato/mask-3.jpg";
import heroWide from "@/assets/pdp/green-tomato/hero-wide.jpg";
import productMain from "@/assets/pdp/green-tomato/product-main.jpg";
import { useLocale } from "@/hooks/useLocale";

export function GreenTomatoSetStory({ title }: { title: string }) {
  const { tt } = useLocale();
  return (
    <>
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
          extraImage: { src: heroWide, alt: tt(title), aspect: "16 / 5" },
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
          systemsTitle: "Why It Works",
          systems: [
            {
              key: "green-tomato",
              name: "Green Tomato Pore Complex",
              image: productMain,
              body:
                "Rich in lycopene and tomatine, green tomato extract helps refine enlarged pores, tighten sagging skin, and rebalance oil for a smoother, more resilient complexion.",
            },
            {
              key: "cica",
              name: "4-CICA Comfort Complex",
              image: mask3,
              body:
                "Four Centella Asiatica derivatives (Asiaticoside, Madecassoside, Asiatic Acid, Madecassic Acid) work with micro-crystal moisture to instantly calm reactive skin.",
            },
            {
              key: "mud",
              name: "Deep-Cleansing Mud Complex",
              image: mask1,
              body:
                "A patented mineral mud blend with natural clay adsorbs impurities and excess sebum from within pores while leaving the moisture barrier intact.",
            },
          ],
          resultsTitle: "A Two-Step Pore Ritual",
          resultsSubtitle: "Results may vary.",
          resultsImages: [heroWide],
          results: [
            {
              title: "Step 1 — Purify with the Wash-off Mask",
              body: "1–2 times a week, apply an even layer over cleansed skin, leave for 10–15 minutes, then rinse thoroughly to draw out pore impurities.",
            },
            {
              title: "Step 2 — Tighten with the Lifting Serum",
              body: "Morning and night after toner, press 2–3 drops onto the T-zone and cheeks to refine, firm and rebalance pore-prone areas.",
            },
            {
              title: "A Complete Pore Care Duo",
              body: "Formulated together to purify, tighten and hydrate — ideal for oily, combination, and dull, textured skin looking for a smoother finish.",
            },
          ],
        }}
      />
    </>
  );
}
