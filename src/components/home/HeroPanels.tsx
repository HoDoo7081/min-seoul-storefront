import { useState } from "react";
import { Link } from "@tanstack/react-router";
import hero1Product from "@/assets/home/hero1-product.jpg";
import hero1Model from "@/assets/home/hero1-model.jpg";
import hero2Product from "@/assets/home/hero2-product.jpg";
import hero2Model from "@/assets/home/hero2-model.jpg";
import hero3Product from "@/assets/home/hero3-product.jpg";
import hero3Model from "@/assets/home/hero3-model.jpg";

type Panel = {
  brandHandle: string;
  product: string;
  model: string;
  title: string;
  subtitle: string;
};

const PANELS: Panel[] = [
  {
    brandHandle: "aesthein",
    product: hero1Product,
    model: hero1Model,
    title: "All-Skin Anti-Aging Line",
    subtitle: "You can take care of various skin types and even anti-aging",
  },
  {
    brandHandle: "giclee",
    product: hero2Product,
    model: hero2Model,
    title: "Ectoin Barrier Line",
    subtitle: "Maintain moisture for a long time and prevent water loss",
  },
  {
    brandHandle: "the-mute",
    product: hero3Product,
    model: hero3Model,
    title: "Tea Tree Toner",
    subtitle: "Instantly lowers skin temperature by 2.63°C and controls excess sebum",
  },
];

function Panel({ panel }: { panel: Panel }) {
  const [active, setActive] = useState(0);
  return (
    <Link
      to="/collections/$brandHandle"
      params={{ brandHandle: panel.brandHandle }}
      className="group block"
    >
      <div className="grid grid-cols-2">
        <div className="relative aspect-square overflow-hidden bg-[#f3f3f1]">
          <img
            src={panel.product}
            alt={panel.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-x-0 bottom-0 px-5 pb-8 pt-16 text-foreground">
            <h2 className="text-[20px] font-medium leading-tight md:text-[26px]">
              {panel.title}
            </h2>
            <p className="mt-1.5 text-[11px] leading-snug text-foreground/60 md:text-[13px]">
              {panel.subtitle}
            </p>
            <div className="mt-4 flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setActive(i);
                  }}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    i === active ? "bg-foreground" : "bg-foreground/25"
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
