import { useEffect } from "react";
import heroBanner from "@/assets/pdp/giclee-barrier/hero-banner.png";

// Cream features
import cream1 from "@/assets/pdp/giclee-cream/feat-1-new.jpg";
import cream2 from "@/assets/pdp/giclee-cream/feat-2-new.png";
import cream3 from "@/assets/pdp/giclee-cream/feat-3-new.jpg";

// Cleanser features
import cleanserThumb from "@/assets/products/giclee-cleanser-thumb-v2.png";
import cleanserSq1 from "@/assets/products/giclee-cleanser-sq1-v2.jpg";
import cleanserSq2 from "@/assets/products/giclee-cleanser-sq2-v2.jpg";

// Ectoin key ingredient images
import imgMoisturizing from "@/assets/pdp/giclee-cream/ectoin-moisturizing.jpg";
import imgProtection from "@/assets/pdp/giclee-cream/ectoin-protection.jpg";
import imgSoothing from "@/assets/pdp/giclee-cream/ectoin-soothing-v4.jpg";

type Feature = {
  image: string;
  title: string;
  body: string;
  imgClassName?: string;
};

const CREAM_FEATURES: Feature[] = [
  {
    image: cream1,
    title: "Barrier Repair & Restoration",
    body: "Formulated with Ectoin, a naturally derived cell-protective ingredient, this cream deeply replenishes moisture, reinforces the skin barrier, and helps damaged skin recover its natural resilience.",
  },
  {
    image: cream2,
    title: "Soothing & Calming",
    body: "Designed for sensitive and compromised skin, it delivers immediate relief from irritation and redness while restoring a calm, stable skin condition with every use.",
  },
  {
    image: cream3,
    title: "Antioxidant Protection",
    body: "Powered by naturally sourced botanical extracts, it shields skin from environmental stressors including UV damage and pollution, helping to visibly reduce signs of aging and maintain a healthy, balanced complexion.",
  },
];

const CLEANSER_FEATURES: Feature[] = [
  {
    image: cleanserThumb,
    title: "Transformative Puffy Texture",
    body: "A uniquely light and airy foam texture that transforms upon contact with skin, delivering a thorough yet gentle cleanse without stripping the skin's natural moisture.",
    imgClassName: "scale-[1.45] object-center",
  },
  {
    image: cleanserSq1,
    title: "pH-Balanced Formula",
    body: "Formulated to maintain the skin's optimal acidic pH balance, supporting a healthy skin environment and minimizing irritation for even the most sensitive skin types.",
    imgClassName: "object-bottom",
  },
  {
    image: cleanserSq2,
    title: "Ectoin Cell Protection",
    body: "Powered by naturally derived Ectoin, this cleanser goes beyond cleansing to actively shield skin cells from environmental stressors while soothing and restoring the skin barrier with every wash.",
    imgClassName: "object-center",
  },
];

type TabKey = "moisturizing" | "protection" | "soothing";

type Tab = {
  key: TabKey;
  label: string;
  image: string;
  title: string;
  body: string;
};

const TABS: Tab[] = [
  {
    key: "moisturizing",
    label: "Moisturizing",
    image: imgMoisturizing,
    title: "Moisturizing",
    body: "Ectoin's exceptional water-binding capacity helps lock in moisture for extended periods, effectively preventing transepidermal water loss and keeping skin deeply hydrated throughout the day.",
  },
  {
    key: "protection",
    label: "Protection",
    image: imgProtection,
    title: "Protection",
    body: "A naturally designed cell-protective ingredient, Ectoin shields skin proteins from a broad range of environmental stressors including UVA/UVB, infrared, heat, cold, dryness, air pollution, blue light, and oxidative damage.",
  },
  {
    key: "soothing",
    label: "Soothing",
    image: imgSoothing,
    title: "Soothing",
    body: "By reinforcing the skin's barrier structure, Ectoin improves flexibility, reduces roughness, and effectively calms irritation, itching, and redness — making it ideal for post-procedure skin recovery and reactive skin types.",
  },
];

function FeatureGrid({ title, features }: { title: string; features: Feature[] }) {
  return (
    <section className="mx-auto max-w-[1280px] px-5 pb-10 pt-4 md:px-10">
      <h2 className="text-[22px] font-semibold tracking-tight md:text-[26px]">
        {title}
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5">
        {features.map((f) => (
          <figure key={f.title}>
            <div className="aspect-square w-full overflow-hidden rounded-[2px] bg-muted">
              <img
                src={f.image}
                alt={f.title}
                className={`h-full w-full object-cover ${f.imgClassName ?? ""}`}
              />
            </div>
            <figcaption className="mt-3">
              <h3 className="text-[13px] font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-[12px] leading-[1.7] text-muted-foreground">
                {f.body}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function GicleeBarrierStory({ title }: { title: string }) {
  useEffect(() => {
    [imgMoisturizing, imgProtection, imgSoothing].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <>
      {/* Hero banner */}
      <section className="mx-auto mt-4 max-w-[1280px] px-5 md:px-10">
        <div className="relative overflow-hidden rounded-[2px]">
          <img
            src={heroBanner}
            alt={title}
            className="h-auto w-full object-cover"
          />
          <div className="absolute left-0 top-0 flex flex-col items-start justify-start p-2 text-left sm:p-3 md:p-6">
            <h2 className="text-[11px] font-semibold tracking-tight text-white sm:text-[13px] md:text-[18px]">
              {title}
            </h2>
            <p className="mt-0.5 text-[8px] text-white/85 sm:text-[10px] md:text-[11px]">
              Sophisticated Cosmeceutical Brand, GICLÉE
            </p>
          </div>
        </div>
      </section>

      <FeatureGrid
        title="THE CLINIC Ectoin Barrier Restorative Cream"
        features={CREAM_FEATURES}
      />

      <FeatureGrid
        title="THE CLINIC Ectoin pH-Balancing Gel Cleanser"
        features={CLEANSER_FEATURES}
      />

      {/* Key Ingredient: Ectoin — 3 up grid */}
      <section className="mx-auto max-w-[1280px] px-5 pb-10 pt-4 md:px-10">
        <h2 className="text-[22px] font-semibold tracking-tight md:text-[26px]">
          Key Ingredient: Ectoin®
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5">
          {TABS.map((t) => (
            <figure key={t.key}>
              <div className="aspect-square w-full overflow-hidden rounded-[2px] bg-muted">
                <img
                  src={t.image}
                  alt={t.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-3">
                <h3 className="text-[15px] font-semibold md:text-[16px]">{t.title}</h3>
                <p className="mt-1.5 text-[12px] leading-[1.7] text-muted-foreground">
                  {t.body}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
