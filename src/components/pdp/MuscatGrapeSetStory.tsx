import { GenericStory } from "./GenericStory";
import heroBg from "@/assets/pdp/muscat-grape/hero-bg.png";
import bannerProducts from "@/assets/pdp/muscat-grape/banner-products.jpg";
import serum1 from "@/assets/pdp/muscat-grape/serum-1.jpg";
import serum2 from "@/assets/pdp/muscat-grape/serum-2.jpg";
import serum3 from "@/assets/pdp/muscat-grape/serum-3.jpg";
import mask1 from "@/assets/pdp/muscat-grape/mask-1.jpg";
import mask2 from "@/assets/pdp/muscat-grape/mask-2.jpg";
import mask3 from "@/assets/pdp/muscat-grape/mask-3.jpg";
import cream1 from "@/assets/pdp/muscat-grape/cream-1.jpg";
import cream2 from "@/assets/pdp/muscat-grape/cream-2.jpg";
import cream3 from "@/assets/pdp/muscat-grape/cream-3.jpg";
import { useLocale } from "@/hooks/useLocale";

export function MuscatGrapeSetStory({ title }: { title: string }) {
  const { tt } = useLocale();

  return (
    <>
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

      <GenericStory
        config={{
          title: "Muscat Grape Vita C Dark Spot Serum Plain — 30ml",
          featuresAspect: "239 / 294",
          featuresFit: "cover",
          features: [
            {
              image: serum1,
              title: "Three-Step Precision Brightening for Dark Spots",
              body:
                "A brightening serum with golden niacinamide, triple vitamin C derivatives, and grape-derived actives to visibly refine dullness and uneven tone.",
            },
            {
              image: serum2,
              title: "Low-Irritation Daily Glow Formula",
              body:
                "A gentle watery texture absorbs quickly and layers comfortably, helping skin look clear and luminous without a heavy or sticky finish.",
            },
            {
              image: serum3,
              title: "Water-Burst Gel Serum for Makeup-Ready Skin",
              body:
                "Hydrating gel droplets melt into skin to leave a fresh, dewy surface that feels smooth, bouncy, and ready for makeup.",
            },
          ],
        }}
      />

      <GenericStory
        config={{
          title: "Muscat Grape Vita C Brightening Wash-off Mask — 100g",
          featuresAspect: "239 / 294",
          featuresFit: "cover",
          features: [
            {
              image: mask1,
              title: "Grape-Glow Clarity for Refined Skin",
              body:
                "A rich wash-off mask helps sweep away dull buildup while supporting a smoother, clearer-looking complexion after rinsing.",
            },
            {
              image: mask2,
              title: "Fine Grape Seed Exfoliation",
              body:
                "Finely milled grape seed powder gently polishes rough texture and dead skin cells, leaving skin soft without harsh friction.",
            },
            {
              image: mask3,
              title: "10-Berry Complex for Deep Moisture",
              body:
                "A 10-berry complex and moisture-locking care wrap skin in nourishment so it feels supple, hydrated, and comfortably refreshed.",
            },
          ],
        }}
      />

      <GenericStory
        config={{
          title: "Muscat Grape Vita C Dark Spot Cream Plain — 35ml",
          featuresAspect: "239 / 294",
          featuresFit: "cover",
          features: [
            {
              image: cream1,
              title: "Three-Step Nourishing Brightening Care",
              body:
                "A daily cream pairs brightening actives with comforting moisture to help reduce the look of dullness and support a more radiant finish.",
            },
            {
              image: cream2,
              title: "Zero-Burden Low-Irritation Brightening",
              body:
                "A soft, lightweight cream spreads evenly and absorbs cleanly, making brightening care easy for daily routines and sensitive-feeling skin.",
            },
            {
              image: cream3,
              title: "Glass-Skin Radiance with Muscat Grape",
              body:
                "Muscat grape care helps revive translucent radiance while moisturizing the skin barrier for a smooth, glassy glow.",
            },
          ],
        }}
      />
    </>
  );
}