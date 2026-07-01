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
import hero4Product from "@/assets/home/hero4-product.png.asset.json";
import hero4Model from "@/assets/home/hero4-model.png.asset.json";

type Slide = {
  brandHandle: string;
  product: string;
  model: string;
  title: string;
  subtitle: string;
};

const SLIDES: Slide[] = [
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
  {
    brandHandle: "sungboon-edition",
    product: hero4Product.url,
    model: hero4Model.url,
    title: "SUNGBOON EDITION Skincare Line",
    subtitle: "Brightening, pore-minimizing, and perfect for makeup prep",
  },
];


// Preload alt images so they're cached
const _preload = [hero1Alt, hero2Alt];

const ROTATION_MS = 5000;

export function HeroPanels() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, ROTATION_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section
      aria-label="Featured collections"
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative">
        {SLIDES.map((slide, i) => (
          <Link
            key={slide.brandHandle}
            to="/collections/$brandHandle"
            params={{ brandHandle: slide.brandHandle }}
            className="group block transition-opacity duration-700 ease-out"
            style={{
              opacity: i === active ? 1 : 0,
              pointerEvents: i === active ? "auto" : "none",
              position: i === active ? "relative" : "absolute",
              inset: i === active ? undefined : 0,
              zIndex: i === active ? 1 : 0,
            }}
            aria-hidden={i !== active}
          >
            <div className="grid grid-cols-2">
              {/* Left — product */}
              <div className="relative aspect-square overflow-hidden bg-[#f3f3f1]">
                <img
                  src={slide.product}
                  alt={slide.title}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={i === 0 ? "high" : "low"}
                  onError={(e) => { e.currentTarget.style.opacity = "0"; }}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-8 pt-16 text-center text-foreground">
                  <h2 className="text-[20px] font-medium leading-tight md:text-[26px]">
                    {slide.title}
                  </h2>
                  <p className="mt-1.5 text-[11px] leading-snug text-foreground/60 md:text-[13px]">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
              {/* Right — model */}
              <div className="relative aspect-square overflow-hidden bg-[#d8c8b6]">
                <img
                  src={slide.model}
                  alt=""
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={i === 0 ? "high" : "low"}
                  onError={(e) => { e.currentTarget.style.opacity = "0"; }}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Dots */}
      <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center md:bottom-6">
        <div className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-background/70 px-3 py-2 backdrop-blur-sm">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActive(i);
              }}
              aria-label={`Slide ${i + 1}`}
              className="relative flex h-6 items-center justify-center px-1"
            >
              <span
                className={`block h-1.5 rounded-full transition-all ${
                  i === active ? "w-6 bg-foreground" : "w-1.5 bg-foreground/30"
                }`}
              />
            </button>
          ))}

        </div>
      </div>
    </section>
  );
}
