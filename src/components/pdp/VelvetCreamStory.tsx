import { useState } from "react";
import energyCare from "@/assets/pdp/velvet-cream/energy-care.png";
import barrierSupport from "@/assets/pdp/velvet-cream/barrier-support.png";
import moistureFinish from "@/assets/pdp/velvet-cream/moisture-finish.png";
import sysEnergy from "@/assets/pdp/velvet-cream/energy-activation.png";
import sysBarrier from "@/assets/pdp/velvet-cream/barrier-restoration.png";
import sysRegen from "@/assets/pdp/velvet-cream/skin-regeneration.png";
import resultsBefore from "@/assets/pdp/velvet-cream/results-before.png";
import resultsAfter from "@/assets/pdp/velvet-cream/results-after.jpg";
import homecareDay from "@/assets/pdp/velvet-cream/homecare-day.png";
import homecareNight from "@/assets/pdp/velvet-cream/homecare-night.png";

const TOP_FEATURES = [
  {
    image: energyCare,
    title: "ATP + NAD\u207A Energy Care",
    body:
      "Powered by ATP and NAD\u207A, this cream helps revitalize the look of tired skin for a fresher, more energized complexion.",
  },
  {
    image: barrierSupport,
    title: "Comforting Barrier Support",
    body:
      "This rich, nourishing formula helps keep skin feeling comfortable, soft, and well-conditioned.",
  },
  {
    image: moistureFinish,
    title: "Velvety Moisture Finish",
    body:
      "Delivers deep hydration with a smooth, velvety texture that absorbs beautifully without feeling heavy.",
  },
];

type System = { key: string; name: string; image: string; body: string };

const SYSTEMS: System[] = [
  {
    key: "energy",
    name: "Energy Activation",
    image: sysEnergy,
    body:
      "Powered by NAD\u207A, NMN, and CoQ10, this cream goes beyond surface hydration — it recharges your skin's cellular energy to visibly improve radiance, texture, and overall skin condition from within.",
  },
  {
    key: "barrier",
    name: "Barrier Restoration",
    image: sysBarrier,
    body:
      "Formulated with Ceramide and Glutathione, it actively rebuilds a compromised skin barrier — reducing sensitivity, locking in moisture, and creating a resilient shield against daily environmental stressors.",
  },
  {
    key: "regen",
    name: "Skin Regeneration",
    image: sysRegen,
    body:
      "The 4GF growth factor complex — EGF, IGF, FGF, and TGF — works in synergy with CICA and Beta-Glucan to accelerate skin recovery, visibly smooth fine lines, and restore firmness and elasticity over time.",
  },
];

const RESULTS = [
  {
    title: "Visibly Calmer, More Even Skin",
    body:
      "Redness and irritation fade with consistent use — skin looks noticeably clearer, smoother, and more balanced.",
  },
  {
    title: "Bounces Back Faster",
    body:
      "Post-procedure or stressed skin recovers more quickly. Less redness, less downtime, more resilience.",
  },
  {
    title: "Firmer, More Youthful Appearance",
    body:
      "Fine lines appear softened, skin feels lifted, and overall texture looks refined and revitalized.",
  },
];

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

export function VelvetCreamStory({ title }: { title: string }) {
  const [active, setActive] = useState(0);
  const sys = SYSTEMS[active];

  return (
    <section className="mx-auto max-w-[1280px] px-5 pb-10 pt-4 md:px-10">
      {/* Title */}
      <h2 className="text-[22px] font-semibold tracking-tight md:text-[26px]">
        {title}
      </h2>

      {/* 3-column hero features */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5">
        {TOP_FEATURES.map((f) => (
          <figure key={f.title}>
            <div className="aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-white">
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

      {/* 5-System Formula */}
      <div className="mt-20">
        <h2 className="text-[22px] font-semibold tracking-tight md:text-[26px]">
          The 5-System Formula Designed to Move Your Skin
        </h2>

        <div className="mt-8 grid items-center gap-8 md:grid-cols-2 md:gap-16">
          <div
            key={sys.key}
            className="aspect-square w-full overflow-hidden rounded-[2px] bg-muted animate-fade-in"
          >
            <img
              src={sys.image}
              alt={sys.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div key={`${sys.key}-text`} className="animate-fade-in">
            <h3 className="text-[24px] font-semibold tracking-tight md:text-[28px]">
              {sys.name}
            </h3>
            <p className="mt-4 max-w-[420px] text-[13px] leading-[1.8] text-muted-foreground">
              {sys.body}
            </p>
          </div>
        </div>

        {/* Tab strip */}
        <div className="mt-10 grid grid-cols-3 border-t border-border">
          {SYSTEMS.map((it, i) => {
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

      {/* Real Skin, Real Results */}
      <div className="mt-20 grid gap-8 md:grid-cols-2 md:gap-12">
        <div>
          <h2 className="text-[22px] font-semibold tracking-tight md:text-[26px]">
            Real Skin, Real Results
          </h2>
          <ol className="mt-6 space-y-5">
            {RESULTS.map((r, i) => (
              <li key={r.title} className="text-[12px] leading-[1.7]">
                <p className="font-semibold text-foreground">
                  {i + 1}. {r.title}
                </p>
                <p className="mt-1 text-muted-foreground">{r.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="grid grid-rows-2 gap-0">
          <div className="aspect-square w-full overflow-hidden bg-muted">
            <img
              src={resultsBefore}
              alt="Before"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="aspect-square w-full overflow-hidden bg-muted">
            <img
              src={resultsAfter}
              alt="After"
              className="h-full w-full object-cover"
            />
          </div>
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

      <div className="mx-auto mt-8 w-full max-w-[1000px]">
        <img
          key={tab}
          src={image}
          alt={`${tab} homecare products`}
          className="block w-full object-contain animate-fade-in"
        />
      </div>

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
