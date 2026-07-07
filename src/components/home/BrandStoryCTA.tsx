import { Link } from "@tanstack/react-router";
import { useLocale } from "@/hooks/useLocale";

export function BrandStoryCTA() {
  const { t } = useLocale();
  return (
    <section
      className="w-full text-white"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      <div className="grid md:grid-cols-2">
        <div className="aspect-[4/3] md:aspect-auto md:min-h-[480px]">
          <img
            src="https://placehold.co/800x600/1a1a1a/c9a96e?text=Our+Story"
            alt="Min Seoul atelier"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-14 md:px-20 md:py-20">
          <p
            className="text-[12px] uppercase text-accent"
            style={{ letterSpacing: "0.2em" }}
          >
            {t("home.story.eyebrow")}
          </p>
          <h2 className="mt-3 font-heading text-[32px] leading-tight text-white md:text-[40px]">
            {t("home.story.title")}
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-[1.8] text-white/70">
            {t("home.story.body")}
          </p>
          <div className="mt-8">
            <Link
              to="/pages/about"
              className="inline-block rounded-[4px] border border-white px-7 py-3 text-sm text-white transition-colors duration-[250ms] hover:bg-white hover:text-foreground"
            >
              {t("home.story.cta")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
