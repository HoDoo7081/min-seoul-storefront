import { useEffect, useState } from "react";
import imgMoisturizing from "@/assets/pdp/giclee-cream/ectoin-moisturizing.jpg";
import imgProtection from "@/assets/pdp/giclee-cream/ectoin-protection.jpg";
import imgSoothing from "@/assets/pdp/giclee-suncream/ectoin-soothing.jpg";
import f1 from "@/assets/pdp/giclee-suncream/feat-1.jpg";
import f2 from "@/assets/pdp/giclee-suncream/feat-2.jpg";
import f3 from "@/assets/pdp/giclee-suncream/feat-3.jpg";

type TabKey = "moisturizing" | "protection" | "soothing";

const TABS = [
  {
    key: "moisturizing" as TabKey,
    label: "Moisturizing",
    image: imgMoisturizing,
    title: "Moisturizing",
    body: "Ectoin's exceptional water-binding capacity helps lock in moisture for extended periods, effectively preventing transepidermal water loss and keeping skin deeply hydrated throughout the day.",
  },
  {
    key: "protection" as TabKey,
    label: "Protection",
    image: imgProtection,
    title: "Protection",
    body: "A naturally designed cell-protective ingredient, Ectoin shields skin proteins from a broad range of environmental stressors including UVA/UVB, infrared, heat, cold, dryness, air pollution, blue light, and oxidative damage.",
  },
  {
    key: "soothing" as TabKey,
    label: "Soothing",
    image: imgSoothing,
    title: "Soothing",
    body: "By reinforcing the skin's barrier structure, Ectoin improves flexibility, reduces roughness, and effectively calms irritation, itching, and redness — making it ideal for post-procedure skin recovery and reactive skin types.",
  },
];

const FEATURES = [
  {
    image: f1,
    title: "Weightless Daily Glide",
    body: "Combines the featherlight, clear glide of an essence with the seamless adherence of a cream. It absorbs quickly without any heavy residue or stickiness, offering a breathable protective barrier perfect for daily wear.",
  },
  {
    image: f2,
    title: "Cellular Defense Shield",
    body: "Infused with Ectoin, a powerful cell-protectant derived from extreme environments. It builds a weightless shield over compromised skin, actively preventing moisture loss and helping the skin barrier recover its natural resilience.",
  },
  {
    image: f3,
    title: "Antioxidant Protection",
    body: "Powered by naturally sourced botanical extracts, it shields skin from environmental stressors including UV damage and pollution, helping to visibly reduce signs of aging and maintain a healthy, balanced complexion.",
  },
];

export function GicleeSunCreamStory({ title }: { title: string }) {
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
              <div className="aspect-square w-full overflow-hidden rounded-[2px] bg-muted">
                <img
                  src={f.image}
                  alt={f.title}
                  className="h-full w-full object-cover"
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
    </>
  );
}
