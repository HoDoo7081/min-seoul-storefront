import { useState } from "react";
import pillarCare from "@/assets/pdp/derma-sense/pillar-care.png";
import pillarAnti from "@/assets/pdp/derma-sense/pillar-anti.png";
import ingAcne from "@/assets/pdp/derma-sense/ing-acne.png";
import ingCollagen from "@/assets/pdp/derma-sense/ing-collagen.png";
import faceOily from "@/assets/pdp/derma-sense/face-oily.png";
import faceDry from "@/assets/pdp/derma-sense/face-dry.jpg";

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
    image: ingAcne,
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
        <figure className="md:col-span-1">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-muted">
            <img
              src={pillarCare}
              alt="Care for every skin type"
              className="h-full w-full object-cover"
            />
          </div>
          <figcaption className="mt-3">
            <h3 className="text-[13px] font-semibold">
              Care for Every Skin Type, Every Stage of Life.
            </h3>
            <p className="mt-1.5 text-[12px] leading-[1.7] text-muted-foreground">
              From children to adults — including those with oily, dry, or
              sensitive skin. This gentle formula is suitable for the whole
              family and all skin concerns.
            </p>
          </figcaption>
        </figure>

        <figure className="md:col-span-2">
          <div className="aspect-[8/3] w-full overflow-hidden rounded-[2px] bg-muted">
            <img
              src={pillarAnti}
              alt="Anti-aging benefits and deep pore clarifying"
              className="h-full w-full object-cover"
            />
          </div>
          <figcaption className="mt-3 grid grid-cols-2 gap-6">
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
          </figcaption>
        </figure>
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
            <div className="aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-muted">
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
            <div className="aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-muted">
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
    </section>
  );
}
