import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import hero1Product from "@/assets/home/hero1-product.jpg";
import hero1Alt from "@/assets/home/hero1-alt.jpg";
import hero1Model from "@/assets/home/hero1-model.jpg";
import hero2Product from "@/assets/home/hero2-product.jpg";
import hero2Alt from "@/assets/home/hero2-alt.jpg";
import hero2Model from "@/assets/home/hero2-model.jpg";
import hero3Product from "@/assets/home/hero3-product.jpg";
import hero3Model from "@/assets/home/hero3-model.jpg";
import cardSkincare from "@/assets/home/card-skincare.jpg";
import cardMid from "@/assets/home/card-mid.jpg";
import cardSets from "@/assets/home/card-sets.jpg";

type Panel = {
  brandHandle: string;
  slides: string[];
  model: string;
  title: string;
  subtitle: string;
};

const PANELS: Panel[] = [
  {
    brandHandle: "aesthein",
    slides: [hero1Product, hero1Alt, cardSkincare],
    model: hero1Model,
    title: "All-Skin Anti-Aging Line",
    subtitle: "You can take care of various skin types and even anti-aging",
  },
  {
    brandHandle: "giclee",
    slides: [hero2Product, hero2Alt, cardMid],
    model: hero2Model,
    title: "Ectoin Barrier Line",
    subtitle: "Maintain moisture for a long time and prevent water loss",
  },
  {
    brandHandle: "the-mute",
    slides: [hero3Product, cardSets, cardSkincare],
    model: hero3Model,
    title: "Tea Tree Toner",
    subtitle: "Instantly lowers skin temperature by 2.63°C and controls excess sebum",
  },
];

const ROTATION_MS = 4500;

function Panel({ panel }: { panel: Panel }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % panel.slides.length);
    }, ROTATION_MS);
    return () => window.clearInterval(id);
  }, [paused, panel.slides.length]);

  return (
    <Link
      to="/collections/$brandHandle"
      params={{ brandHandle: panel.brandHandle }}
      className="group block"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid grid-cols-2">
        <div className="relative aspect-square overflow-hidden bg-[#f3f3f1]">
          {panel.slides.map((src, i) => (
            <img
              key={src + i}
              src={src}
              alt={panel.title}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out group-hover:scale-[1.03]"
              style={{ opacity: i === active ? 1 : 0 }}
            />
          ))}
          <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-8 pt-16 text-foreground">
            <h2 className="text-[20px] font-medium leading-tight md:text-[26px]">
              {panel.title}
            </h2>
            <p className="mt-1.5 text-[11px] leading-snug text-foreground/60 md:text-[13px]">
              {panel.subtitle}
            </p>
            <div className="mt-4 flex items-center gap-1.5">
              {panel.slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setActive(i);
                  }}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === active ? "w-5 bg-foreground" : "w-1.5 bg-foreground/25"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="relative aspect-square overflow-hidden bg-[#d8c8b6]">
          <img
            src={panel.model}
            alt=""
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
      </div>
    </Link>
  );
}

export function HeroPanels() {
  return (
    <section aria-label="Featured collections">
      {PANELS.map((p) => (
        <Panel key={p.brandHandle} panel={p} />
      ))}
    </section>
  );
}
