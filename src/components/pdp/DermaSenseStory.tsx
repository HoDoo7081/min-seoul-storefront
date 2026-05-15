import { useState } from "react";
import pillarCare from "@/assets/pdp/derma-sense/pillar-care.png";
import pillarAntiAging from "@/assets/pdp/derma-sense/pillar-anti-aging.png";
import pillarPore from "@/assets/pdp/derma-sense/pillar-pore.png";
import ingAcne from "@/assets/pdp/derma-sense/ing-acne.png";
import ingCollagen from "@/assets/pdp/derma-sense/ing-collagen.png";
import ingLacto from "@/assets/pdp/derma-sense/ing-lacto.jpg";
import faceOily from "@/assets/pdp/derma-sense/face-oily.png";
import faceDry from "@/assets/pdp/derma-sense/face-dry.jpg";
import homecareDay from "@/assets/pdp/derma-sense/homecare-day.png";
import homecareNight from "@/assets/pdp/derma-sense/homecare-night.png";

const DAY_LABELS = [
  "Derma Sense Cleansing Gel",
  "Medi Formula Ampoule",
  "4GF Supreme Plumping Essence",
  "Brightening Barrier Serum",
  "ATP-NAD\u207A Synergy Velvet Cream",
  "Soft Glow Tone Up Sun Cream",
];
const NIGHT_LABELS = [
  "Derma Sense Cleansing Gel",
  "Exo Bubble Booster",
  "Medi Formula Ampoule",
  "4GF Supreme Plumping Essence",
  "Brightening Barrier Serum",
  "All Skin Mask Pack",
  "ATP-NAD\u207A Synergy Velvet Cream",
];

type Ingredient = {
  key: string;
  name: string;
  image: string;
  body: string;
};

const INGREDIENTS: Ingredient[] = [
  {
    key: "acne",
    name: "AcneZero",
    image: ingAcne,
    body:
      "Aesthein's AcneZero ingredient helps prevent breakouts, reduce sebum, and provide antibacterial and anti-inflammatory benefits.",
  },
  {
    key: "collagen",
    name: "3 Types of Collagen",
    image: ingCollagen,
    body:
      "Firms and elasticizes with three types of collagen while delivering deep hydration and strengthening the skin barrier.",
  },
  {
    key: "lacto",
    name: "Lactobacillus Exosome",
    image: ingLacto,
    body:
      "Strengthens skin immunity and soothes inflammation for a more balanced, resilient complexion.",
  },
];

export function DermaSenseStory({ title }: { title: string }) {
  const [active, setActive] = useState(0);
  const ing = INGREDIENTS[active];

  return (
    <section className="mx-auto max-w-[1280px] px-5 pb-10 pt-4 md:px-10">
      {/* Title */}
      <h2 className="text-[22px] font-semibold tracking-tight md:text-[26px]">
        {title}
      </h2>

      {/* Hero pillar images: left 1col / right 2col */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="aspect-square w-full overflow-hidden rounded-[2px] bg-muted">
            <img
              src={pillarAntiAging}
              alt="Care for every skin type"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="aspect-square w-full overflow-hidden rounded-[2px] bg-muted md:aspect-[2/1]">
            <img
              src={pillarPore}
              alt="Anti-aging benefits and deep pore clarifying"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Captions row aligned with image columns */}
      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-4">
        <div className="md:col-span-1">
          <h3 className="text-[13px] font-semibold">
            Care for Every Skin Type, Every Stage of Life.
          </h3>
          <p className="mt-1.5 text-[12px] leading-[1.7] text-muted-foreground">
            From children to adults — including those with oily, dry, or
            sensitive skin. This gentle formula is suitable for the whole
            family and all skin concerns.
          </p>
        </div>
        <div className="md:col-span-2 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-[13px] font-semibold">Anti-Aging Benefits</h3>
            <p className="mt-1.5 text-[12px] leading-[1.7] text-muted-foreground">
              Continuously supplies Coenzyme Q10 to combat aging signs, while
              LADICAC targets the root causes — restoring radiance and
              elasticity.
            </p>
          </div>
          <div>
            <h3 className="text-[13px] font-semibold">Deep Pore Clarifying</h3>
            <p className="mt-1.5 text-[12px] leading-[1.7] text-muted-foreground">
              Effectively sweeps away trapped sebum and impurities, helping
              to manage excess oil and keep pores clear from buildup.
            </p>
          </div>
        </div>
      </div>

      {/* Main Ingredients */}
      <div className="mt-20">
        <h2 className="text-[22px] font-semibold tracking-tight md:text-[26px]">
          Main Ingredients
        </h2>

        <div className="mt-8 grid items-center gap-8 md:grid-cols-2 md:gap-16">
          <div
            key={ing.key}
            className="aspect-square w-full overflow-hidden rounded-[2px] bg-muted animate-fade-in"
          >
            <img
              src={ing.image}
              alt={ing.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div key={`${ing.key}-text`} className="animate-fade-in">
            <h3 className="text-[24px] font-semibold tracking-tight md:text-[28px]">
              {ing.name}
            </h3>
            <p className="mt-4 max-w-[420px] text-[13px] leading-[1.8] text-muted-foreground">
              {ing.body}
            </p>
          </div>
        </div>

        {/* Tab strip */}
        <div className="mt-10 grid grid-cols-3 border-t border-border">
          {INGREDIENTS.map((it, i) => {
            const isActive = i === active;
            return (
              <button
                key={it.key}
                onClick={() => setActive(i)}
                className="-mt-px border-t-2 py-4 text-center text-[12px] transition-colors"
                style={{
                  borderColor: isActive
                    ? "var(--color-foreground)"
                    : "transparent",
                  color: isActive
                    ? "var(--color-foreground)"
                    : "var(--color-muted-foreground)",
                  fontWeight: isActive ? 600 : 400,
                  textDecoration: isActive ? "underline" : "none",
                  textUnderlineOffset: "4px",
                }}
              >
                {it.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Face Washing Guide */}
      <div className="mt-20">
        <h2 className="text-[22px] font-semibold tracking-tight md:text-[26px]">
          Face Washing Guide by Skin Type
        </h2>

        <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-10">
          <article>
            <div className="aspect-square w-full overflow-hidden rounded-[2px] bg-muted">
              <img
                src={faceOily}
                alt="For oily and blemish-prone skin"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-[14px] font-semibold">
              For Oily &amp; Blemish-Prone Skin
            </h3>
            <p className="mt-2 text-[12px] leading-[1.7] text-muted-foreground">
              Work the formula into skin for up to 3 minutes to melt away
              impurities and excess sebum. Pores look visibly cleaner — skin
              feels purified, balanced, and never stripped.
            </p>
          </article>
          <article>
            <div className="aspect-square w-full overflow-hidden rounded-[2px] bg-muted">
              <img
                src={faceDry}
                alt="For dry and sensitive skin"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-[14px] font-semibold">
              For Dry &amp; Sensitive Skin
            </h3>
            <p className="mt-2 text-[12px] leading-[1.7] text-muted-foreground">
              Massage gently for 60 seconds to allow the skin-replenishing
              ingredients to sink in before rinsing. Skin is left feeling soft,
              nourished, and comfortably hydrated.
            </p>
          </article>
        </div>
      </div>

      <HomecareSolution />
    </section>
  );
}

function HomecareSolution() {
  const [tab, setTab] = useState<"day" | "night">("day");
  const labels = tab === "day" ? DAY_LABELS : NIGHT_LABELS;
  const image = tab === "day" ? homecareDay : homecareNight;
  const count = labels.length;

  return (
    <div className="mt-20">
      <h2 className="text-center text-[16px] font-semibold tracking-[0.18em] md:text-[18px]">
        ALL SKIN, HOMECARE SOLUTION
      </h2>

      {/* Tabs */}
      <div className="mt-8 flex items-center justify-around md:justify-center md:gap-32">
        {(["day", "night"] as const).map((k) => {
          const active = tab === k;
          return (
            <button
              key={k}
              onClick={() => setTab(k)}
              className="relative pb-1 text-[13px] font-semibold tracking-tight transition-colors md:text-[14px]"
              style={{
                color: active ? "var(--color-foreground)" : "#9ca3af",
              }}
            >
              {k === "day" ? "Day Homecare Solution" : "Night Homecare Solution"}
              {active && (
                <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-foreground" />
              )}
            </button>
          );
        })}
      </div>

      {/* Product row image (original composite) */}
      <div className="mx-auto mt-8 w-full max-w-[1000px]">
        <img
          key={tab}
          src={image}
          alt={`${tab} homecare products`}
          className="block w-full object-contain animate-fade-in"
        />
      </div>

      {/* Number line — N equal columns, circle centered under each product */}
      <div
        className="mx-auto mt-3 grid w-full max-w-[1000px] items-center"
        style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="relative flex h-6 items-center justify-center">
            {i > 0 && (
              <span className="absolute left-0 right-1/2 top-1/2 h-px bg-muted-foreground/30" />
            )}
            {i < count - 1 && (
              <span className="absolute left-1/2 right-0 top-1/2 h-px bg-muted-foreground/30" />
            )}
            <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full border border-muted-foreground/40 bg-background text-[10px] text-muted-foreground">
              {i + 1}
            </span>
          </div>
        ))}
      </div>

      {/* Labels */}
      <div
        className="mx-auto mt-3 grid w-full max-w-[1000px] gap-2"
        style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
      >
        {labels.map((l, i) => (
          <p
            key={i}
            className="text-center text-[10px] leading-[1.4] text-muted-foreground md:text-[11px]"
          >
            {l}
          </p>
        ))}
      </div>
    </div>
  );
}
