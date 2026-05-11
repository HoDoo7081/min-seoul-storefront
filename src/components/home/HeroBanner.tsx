import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useLocale } from "@/hooks/useLocale";

export function HeroBanner() {
  const { t } = useLocale();
  const [active, setActive] = useState(0);
  const TOTAL = 3;
  const images = [
    "https://placehold.co/1440x900/3a4a3c/ffffff?text=Pure+K-Beauty",
    "https://placehold.co/1440x900/2d2d2d/ffffff?text=The+Mute",
    "https://placehold.co/1440x900/6b5a4b/ffffff?text=New+Arrivals",
  ];

  useEffect(() => {
    const id = window.setInterval(() => setActive((i) => (i + 1) % TOTAL), 5000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {Array.from({ length: TOTAL }).map((_, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-[800ms] ease-out"
          style={{ opacity: i === active ? 1 : 0 }}
          aria-hidden={i !== active}
        >
          <img src={images[i]} alt={t(`hero.${i}.title`)} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <div className="max-w-2xl text-white">
              <p className="text-[14px] uppercase text-white/80" style={{ letterSpacing: "0.2em" }}>
                {t(`hero.${i}.brand`)}
              </p>
              <h1
                className="mt-4 font-heading text-white"
                style={{ fontSize: "clamp(36px, 5.5vw, 56px)", lineHeight: 1.15 }}
              >
                {t(`hero.${i}.title`)}
              </h1>
              <p className="mx-auto mt-3 max-w-[480px] text-[16px] text-white/70">
                {t(`hero.${i}.subtitle`)}
              </p>
              <div className="mt-8">
                <Link
                  to="/collections/$brandHandle"
                  params={{ brandHandle: "the-mute" }}
                  className="inline-block rounded-[4px] bg-white px-8 py-3.5 text-sm font-medium text-foreground transition-all duration-[250ms] hover:bg-accent hover:text-white"
                >
                  {t("hero.cta")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-10 left-0 right-0 z-10 flex items-center justify-center gap-2.5">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all ${i === active ? "w-8 bg-white" : "w-1.5 bg-white/50"}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
