import { Link } from "@tanstack/react-router";
import { brands } from "@/data/mockBrands";
import { useLocale } from "@/hooks/useLocale";
import heroImg from "@/assets/home/brand-stilllife.jpg";
import missionImg from "@/assets/home/hero1-model.jpg";
import brandImg1 from "@/assets/home/hero1-product.jpg";
import brandImg2 from "@/assets/home/hero2-product.jpg";
import brandImg3 from "@/assets/home/hero3-product.jpg";

const brandImages = [brandImg1, brandImg2, brandImg3];

export default function AboutPage() {
  const { t, tr } = useLocale();

  return (
    <div className="bg-background">
      {/* SECTION 1 — Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-5 py-16 md:grid-cols-[1.05fr_1fr] md:gap-16 md:px-10 md:py-24">
          <div>
            <p
              className="text-[11px] uppercase text-[#7aa6d6]"
              style={{ letterSpacing: "0.22em" }}
            >
              {t("about.eyebrow")}
            </p>
            <h1
              className="mt-5 font-heading tracking-tight"
              style={{ fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 1.05 }}
            >
              {t("about.headline")}
            </h1>
            <p className="mt-6 max-w-[480px] text-[16px] leading-[1.7] text-muted-foreground md:text-[17px]">
              {t("about.subtext")}
            </p>
          </div>
          <div className="aspect-[4/5] overflow-hidden bg-[#f4f6f9]">
            <img src={heroImg} alt="Selvé" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* SECTION 2 — Brand Cards */}
      <section className="px-5 py-20 md:px-10 md:py-[120px]">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 md:mb-16 md:flex-row md:items-end">
            <h2 className="font-heading text-[32px] tracking-tight md:text-[44px]">
              {t("about.brands")}
            </h2>
            <div className="h-px flex-1 bg-border/60 md:ml-10" />
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {brands.map((b, i) => (
              <article key={b.handle} className="group flex flex-col">
                <div className="aspect-[4/5] overflow-hidden bg-[#f4f6f9]">
                  <img
                    src={brandImages[i % brandImages.length]}
                    alt={b.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="pt-6">
                  <p
                    className="text-[10px] uppercase text-[#7aa6d6]"
                    style={{ letterSpacing: "0.18em" }}
                  >
                    Brand
                  </p>
                  <h3 className="mt-2 font-heading text-[24px] tracking-tight">{b.name}</h3>
                  <p className="mt-2 text-[14px] italic text-muted-foreground">
                    {tr(b.slogan)}
                  </p>
                  <p className="mt-3 text-[14px] leading-[1.7] text-muted-foreground">
                    {tr(b.description)}
                  </p>
                  <Link
                    to="/collections/$brandHandle"
                    params={{ brandHandle: b.handle }}
                    className="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-foreground transition-opacity hover:opacity-60"
                  >
                    {t("about.shop")} <span aria-hidden>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — Mission */}
      <section className="bg-[#f4f6f9] px-5 py-20 md:px-10 md:py-[120px]">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 md:grid-cols-2 md:gap-20">
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={missionImg}
              alt="Selvé mission"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p
              className="text-[11px] uppercase text-[#7aa6d6]"
              style={{ letterSpacing: "0.22em" }}
            >
              {t("about.mission.eyebrow")}
            </p>
            <h2 className="mt-4 font-heading text-[32px] tracking-tight md:text-[44px]">
              {t("about.mission.title")}
            </h2>
            <p className="mt-6 text-[15px] leading-[1.9] text-muted-foreground md:text-[16px]">
              {t("about.mission.body")}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 — Stats */}
      <section className="px-5 py-20 md:px-10 md:py-[120px]">
        <div className="mx-auto max-w-[1280px] border-y border-border/70">
          <div className="grid grid-cols-1 divide-y divide-border/70 md:grid-cols-3 md:divide-x md:divide-y-0">
            {[
              { num: "3+", label: t("about.stat1") },
              { num: "2", label: t("about.stat2") },
              { num: "TikTok · WeChat · Lazada", label: t("about.stat3") },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center"
              >
                <div
                  className="font-heading tracking-tight"
                  style={{
                    fontSize: s.num.length > 10 ? 20 : 56,
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </div>
                <p
                  className="text-[11px] uppercase text-muted-foreground"
                  style={{ letterSpacing: "0.18em" }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — CTA */}
      <section className="px-5 pb-24 md:px-10 md:pb-[120px]">
        <div className="mx-auto max-w-[1280px] rounded-[32px] bg-foreground px-8 py-20 text-center text-background md:px-16 md:py-28">
          <h2 className="mx-auto max-w-[640px] font-heading text-[32px] tracking-tight md:text-[44px]">
            {t("about.cta.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] text-[15px] text-background/70 md:text-[16px]">
            {t("about.cta.subtext")}
          </p>
          <a
            href="mailto:hello@selve.co"
            className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-background px-10 text-[14px] font-medium text-foreground transition-opacity hover:opacity-90"
          >
            {t("about.cta.button")}
          </a>
        </div>
      </section>
    </div>
  );
}
