import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

type Slide = {
  brand: string;
  title: string;
  subtitle: string;
  image: string;
};

const slides: Slide[] = [
  {
    brand: "Giclee",
    title: "Pure K-Beauty",
    subtitle: "자연에서 온 순수함, 매일의 루틴으로.",
    image: "https://placehold.co/1440x900/3a4a3c/ffffff?text=Pure+K-Beauty",
  },
  {
    brand: "The Mute",
    title: "The Mute",
    subtitle: "미니멀한 스킨케어의 완성.",
    image: "https://placehold.co/1440x900/2d2d2d/ffffff?text=The+Mute",
  },
  {
    brand: "Aesthein",
    title: "New Arrivals",
    subtitle: "새로운 시즌, 새로운 루틴.",
    image: "https://placehold.co/1440x900/6b5a4b/ffffff?text=New+Arrivals",
  },
];

export function HeroBanner() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % slides.length),
      5000
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-[800ms] ease-out"
          style={{ opacity: i === active ? 1 : 0 }}
          aria-hidden={i !== active}
        >
          <img
            src={s.image}
            alt={s.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <div className="max-w-2xl text-white">
              <p
                className="text-[14px] uppercase text-white/80"
                style={{ letterSpacing: "0.2em" }}
              >
                {s.brand}
              </p>
              <h1
                className="mt-4 font-heading text-white"
                style={{
                  fontSize: "clamp(36px, 5.5vw, 56px)",
                  lineHeight: 1.15,
                }}
              >
                {s.title}
              </h1>
              <p className="mx-auto mt-3 max-w-[480px] text-[16px] text-white/70">
                {s.subtitle}
              </p>
              <div className="mt-8">
                <Link
                  to="/collections/$brandHandle"
                  params={{ brandHandle: "the-mute" }}
                  className="inline-block rounded-[4px] bg-white px-8 py-3.5 text-sm font-medium text-foreground transition-all duration-[250ms] hover:bg-accent hover:text-white"
                >
                  지금 쇼핑하기
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-10 left-0 right-0 z-10 flex items-center justify-center gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Slide ${i + 1}`}
            onClick={() => setActive(i)}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: i === active ? 28 : 8,
              backgroundColor:
                i === active ? "#ffffff" : "rgba(255,255,255,0.5)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
