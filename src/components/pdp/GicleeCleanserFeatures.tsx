import { useEffect, useState } from "react";
import imgMoisturizing from "@/assets/pdp/giclee-cream/ectoin-moisturizing.jpg";
import imgProtection from "@/assets/pdp/giclee-cream/ectoin-protection.jpg";
import imgSoothing from "@/assets/pdp/giclee-cream/ectoin-soothing-v4.jpg";
import f1 from "@/assets/products/giclee-cleanser-thumb-v2.png";
import f2 from "@/assets/products/giclee-cleanser-sq1-v2.jpg";
import f3 from "@/assets/products/giclee-cleanser-sq2-v2.jpg";
import textureTransform from "@/assets/pdp/giclee-cleanser/texture-transform.png";

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

type Feature = {
  image: string;
  title: string;
  body: string;
  imgClassName?: string;
};

const FEATURES: Feature[] = [
  {
    image: f1,
    title: "Transformative Puffy Texture",
    body: "A uniquely light and airy foam texture that transforms upon contact with skin, delivering a thorough yet gentle cleanse without stripping the skin's natural moisture.",
    imgClassName: "scale-[1.45] object-center",
  },
  {
    image: f2,
    title: "pH-Balanced Formula",
    body: "Formulated to maintain the skin's optimal acidic pH balance, supporting a healthy skin environment and minimizing irritation for even the most sensitive skin types.",
    imgClassName: "scale-[0.7] object-center",
  },
  {
    image: f3,
    title: "Ectoin Cell Protection",
    body: "Powered by naturally derived Ectoin, this cleanser goes beyond cleansing to actively shield skin cells from environmental stressors while soothing and restoring the skin barrier with every wash.",
    imgClassName: "scale-[0.7] object-center",
  },
];

export function GicleeCleanserFeatures({ title }: { title: string }) {
  const [active, setActive] = useState<TabKey>("moisturizing");
  const current = TABS.find((t) => t.key === active) ?? TABS[0];

  useEffect(() => {
    [imgMoisturizing, imgProtection, imgSoothing].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <>
      <section className="mx-auto max-w-[1280px] px-5 pb-10 pt-4 md:px-10">
        <h2 className="text-[22px] font-semibold tracking-tight md:text-[26px]">
          {title}
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5">
          {FEATURES.map((f) => (
            <figure key={f.title}>
              <div className="aspect-square w-full overflow-hidden rounded-[2px] bg-white">
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

      <section className="mx-auto max-w-[1280px] px-5 pb-10 pt-4 md:px-10">
        <h2 className="text-[22px] font-semibold tracking-tight md:text-[26px]">
          Key Ingredient: Ectoin®
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center md:gap-12">
          <div className="relative aspect-square w-full overflow-hidden rounded-[2px] bg-muted">
            {TABS.map((t) => (
              <img
                key={t.key}
                src={t.image}
                alt={t.title}
                loading="eager"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-200"
                style={{ opacity: t.key === active ? 1 : 0 }}
              />
            ))}
          </div>
          <div>
            <h3 className="text-[20px] font-semibold tracking-tight md:text-[24px]">
              {current.title}
            </h3>
            <p className="mt-3 text-[13px] leading-[1.7] text-muted-foreground md:text-[14px]">
              {current.body}
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 border-t border-border">
          {TABS.map((t) => {
            const isActive = t.key === active;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setActive(t.key)}
                className={`py-4 text-center text-[12px] transition-colors md:text-[13px] ${
                  isActive
                    ? "font-semibold text-foreground underline underline-offset-4"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 pb-10 pt-4 md:px-10">
        <h2 className="text-[22px] font-semibold tracking-tight md:text-[26px]">
          Transformative Fluffy Texture
        </h2>
        <p className="mt-3 text-[13px] leading-[1.7] text-muted-foreground md:text-[14px]">
          A gel-type formula that transforms into a dense, fluffy foam upon
          contact with water, gently rolling across the skin to effectively
          lift and absorb makeup and impurities without irritation.
        </p>
        <div className="mt-6 w-full max-w-[520px] md:max-w-[560px]">
          <img
            src={textureTransform}
            alt="Gel transforming into fluffy foam"
            className="h-auto w-full object-contain"
          />
        </div>
      </section>
    </>
  );
}
