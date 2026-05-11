import { Link } from "@tanstack/react-router";
import { brands } from "@/data/mockBrands";
import { useLocale } from "@/hooks/useLocale";

export default function AboutPage() {
  const { t, tr } = useLocale();

  return (
    <div>
      {/* SECTION 1 — Hero */}
      <section className="relative flex h-screen items-center justify-center overflow-hidden">
        <img
          src="https://placehold.co/1440x900/1a1a1a/c9a96e?text=Selv%C3%A9"
          alt="Selvé"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.45)" }} />
        <div className="relative z-10 px-5 text-center">
          <p className="text-white/60" style={{ fontSize: 12, letterSpacing: "0.3em" }}>
            {t("about.eyebrow")}
          </p>
          <h1
            className="mt-4 font-heading text-white"
            style={{ fontSize: "clamp(40px, 6vw, 64px)", lineHeight: 1.1 }}
          >
            {t("about.headline")}
          </h1>
          <p className="mt-4 text-[18px] text-white/70">{t("about.subtext")}</p>
        </div>
      </section>

      {/* SECTION 2 — Brand Cards */}
      <section className="bg-background px-5 py-16 md:px-10 md:py-[100px]">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="mb-10 text-center font-heading text-[32px] md:mb-[60px] md:text-[40px]">
            {t("about.brands")}
          </h2>
          <div className="flex flex-col gap-6 md:flex-row md:gap-8">
            {brands.map((b) => (
              <article
                key={b.handle}
                className="flex-1 overflow-hidden rounded-[16px] border bg-surface transition-all duration-[350ms] hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)]"
              >
                <div
                  className="flex h-[160px] items-center justify-center"
                  style={{ backgroundColor: `color-mix(in oklab, ${b.accentColor} 15%, transparent)` }}
                >
                  <h3 className="font-heading text-[32px]" style={{ color: b.accentColor }}>
                    {b.name}
                  </h3>
                </div>
                <div className="p-7">
                  <p className="mb-3 text-[15px] italic text-muted-foreground">{tr(b.slogan)}</p>
                  <p className="text-[14px] leading-[1.8] text-muted-foreground">{tr(b.description)}</p>
                  <Link
                    to="/collections/$brandHandle"
                    params={{ brandHandle: b.handle }}
                    className="mt-5 inline-block text-[14px] font-medium"
                    style={{ color: b.accentColor }}
                  >
                    {t("about.shop")}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — Story */}
      <section className="bg-muted/40 px-5 py-16 md:px-10 md:py-[100px]">
        <div className="mx-auto grid max-w-[1280px] items-center gap-10 md:grid-cols-2 md:gap-20">
          <img
            src="https://placehold.co/700x500/2d2d2d/c9a96e?text=Selv%C3%A9"
            alt="Selvé mission"
            className="h-auto w-full rounded-[16px] object-cover"
          />
          <div>
            <p className="text-[12px] text-accent" style={{ letterSpacing: "0.2em" }}>
              {t("about.mission.eyebrow")}
            </p>
            <h2 className="mt-3 font-heading text-[28px] md:text-[36px]">
              {t("about.mission.title")}
            </h2>
            <p className="mt-5 text-[15px] leading-[1.9] text-muted-foreground">
              {t("about.mission.body")}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 — Stats */}
      <section className="bg-background px-5 py-14 md:px-10 md:py-20">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-px bg-border md:grid-cols-3">
          {[
            { num: "3+", label: t("about.stat1") },
            { num: "2", label: t("about.stat2") },
            { num: "TikTok · WeChat · Lazada", label: t("about.stat3") },
          ].map((s) => (
            <div key={s.label} className="bg-background px-5 py-10 text-center">
              <div
                className="font-heading text-accent"
                style={{ fontSize: s.num.length > 10 ? 22 : 48, lineHeight: 1.1 }}
              >
                {s.num}
              </div>
              <p className="mt-2 text-[14px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 — CTA */}
      <section
        className="px-5 py-16 text-center text-white md:px-10 md:py-[100px]"
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <h2 className="font-heading text-[32px] text-white md:text-[40px]">
          {t("about.cta.title")}
        </h2>
        <p className="mt-3 text-[16px] text-white/70">{t("about.cta.subtext")}</p>
        <a
          href="mailto:hello@selve.co"
          className="mt-8 inline-block rounded-[4px] border border-white px-9 py-3.5 text-sm text-white transition-colors hover:bg-white hover:text-foreground"
        >
          {t("about.cta.button")}
        </a>
      </section>
    </div>
  );
}
