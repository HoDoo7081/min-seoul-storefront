import { useState } from "react";
import { useLocale } from "@/hooks/useLocale";

export type StoryFeature = { image: string; title: string; body: string };
export type StorySystem = { key: string; name: string; image: string; body: string };
export type StoryResult = { title: string; body: string };

export type StoryConfig = {
  title: string;
  features: StoryFeature[];
  systemsTitle?: string;
  systems?: StorySystem[];
  resultsTitle?: string;
  resultsSubtitle?: string;
  resultsImage?: string;
  resultsImages?: string[];
  results?: StoryResult[];
  extraImage?: { src: string; alt: string; aspect?: string };
  featuresAspect?: string;
  featuresFit?: "cover" | "contain";
};

export function GenericStory({ config }: { config: StoryConfig }) {
  const {
    title,
    features,
    systemsTitle = "Key Benefits",
    systems,
    resultsTitle = "Real Skin, Real Results",
    resultsSubtitle,
    resultsImage,
    resultsImages,
    results,
    extraImage,
    featuresAspect = "4 / 3",
    featuresFit = "cover",
  } = config;
  const [active, setActive] = useState(0);
  const sys = systems?.[active];

  return (
    <section className="mx-auto max-w-[1280px] px-5 pb-10 pt-4 md:px-10">
      <h2 className="text-[22px] font-semibold tracking-tight md:text-[26px]">
        {title}
      </h2>

      {/* Top features (3 col) */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5">
        {features.map((f, i) => (
          <figure key={i}>
            <div className="w-full overflow-hidden rounded-[2px] bg-muted" style={{ aspectRatio: featuresAspect }}>
              <img src={f.image} alt={f.title} className={`h-full w-full ${featuresFit === "contain" ? "object-contain" : "object-cover"}`} />
            </div>
            <figcaption className="mt-3">
              <h3 className="text-[13px] font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-[12px] leading-[1.7] text-muted-foreground">{f.body}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Optional extra wide image */}
      {extraImage && (
        <div className="mt-12 w-full overflow-hidden rounded-[2px] bg-muted" style={{ aspectRatio: extraImage.aspect ?? "16 / 9" }}>
          <img src={extraImage.src} alt={extraImage.alt} className="h-full w-full object-cover" />
        </div>
      )}

      {/* Systems / ingredients */}
      {systems && sys && (
        <div className="mt-20">
          <h2 className="text-[22px] font-semibold tracking-tight md:text-[26px]">
            {systemsTitle}
          </h2>

          <div className="mt-8 grid items-center gap-8 md:grid-cols-2 md:gap-16">
            <div key={sys.key} className="aspect-square w-full overflow-hidden rounded-[2px] bg-muted animate-fade-in">
              <img src={sys.image} alt={sys.name} className="h-full w-full object-cover" />
            </div>
            <div key={`${sys.key}-text`} className="animate-fade-in">
              <h3 className="text-[24px] font-semibold tracking-tight md:text-[28px]">{sys.name}</h3>
              <p className="mt-4 max-w-[420px] text-[13px] leading-[1.8] text-muted-foreground">{sys.body}</p>
            </div>
          </div>

          <div
            className="mt-10 grid border-t border-border"
            style={{ gridTemplateColumns: `repeat(${systems.length}, minmax(0, 1fr))` }}
          >
            {systems.map((it, i) => {
              const isActive = i === active;
              return (
                <button
                  key={it.key}
                  onClick={() => setActive(i)}
                  className="-mt-px border-t-2 py-4 text-center text-[12px] transition-colors"
                  style={{
                    borderColor: isActive ? "var(--color-foreground)" : "transparent",
                    color: isActive ? "var(--color-foreground)" : "var(--color-muted-foreground)",
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
      )}

      {/* Results */}
      {results && results.length > 0 && (
        <div className="mt-20 grid gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <h2 className="text-[22px] font-semibold tracking-tight md:text-[26px]">{resultsTitle}</h2>
            {resultsSubtitle && (
              <p className="mt-1 text-[11px] font-semibold text-foreground">{resultsSubtitle}</p>
            )}
            <ol className="mt-6 space-y-5">
              {results.map((r, i) => (
                <li key={i} className="text-[12px] leading-[1.7]">
                  <p className="font-semibold text-foreground">{i + 1}. {r.title}</p>
                  <p className="mt-1 text-muted-foreground">{r.body}</p>
                </li>
              ))}
            </ol>
          </div>
          {resultsImages && resultsImages.length > 0 ? (
            <div className="flex flex-col gap-3">
              {resultsImages.map((src, i) => (
                <div key={i} className="aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-muted">
                  <img src={src} alt={`Real results ${i + 1}`} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          ) : resultsImage ? (
            <div className="aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-muted">
              <img src={resultsImage} alt="Real results" className="h-full w-full object-cover" />
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}
