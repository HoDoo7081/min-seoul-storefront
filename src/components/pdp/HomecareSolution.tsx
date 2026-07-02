import { useState } from "react";
import { useLocale } from "@/hooks/useLocale";
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

export function HomecareSolution() {
  const [tab, setTab] = useState<"day" | "night">("day");
  const { tt } = useLocale();
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
              {k === "day" ? tt("Day Homecare Solution") : tt("Night Homecare Solution")}
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
            {tt(l)}
          </p>
        ))}
      </div>
    </div>
  );
}
