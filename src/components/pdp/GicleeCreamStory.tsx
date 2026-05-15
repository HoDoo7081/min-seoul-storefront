import { useState } from "react";
import imgMoisturizing from "@/assets/pdp/giclee-cream/ectoin-moisturizing.jpg";
import imgProtection from "@/assets/pdp/giclee-cream/ectoin-protection.jpg";
import imgSoothing from "@/assets/pdp/giclee-cream/ectoin-soothing.jpg";

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

export function GicleeCreamStory({ title: _title }: { title: string }) {
  const [active, setActive] = useState<TabKey>("moisturizing");
  const current = TABS.find((t) => t.key === active) ?? TABS[0];

  return (
    <section className="mx-auto max-w-[1280px] px-5 pb-10 pt-4 md:px-10">
      <h2 className="text-[22px] font-semibold tracking-tight md:text-[26px]">
        Key Ingredient: Ectoin®
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center md:gap-12">
        <div className="aspect-square w-full overflow-hidden rounded-[2px] bg-muted">
          <img
            src={current.image}
            alt={current.title}
            className="h-full w-full object-cover"
          />
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
  );
}
