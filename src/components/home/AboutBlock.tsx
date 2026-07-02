import { Link } from "@tanstack/react-router";
import { useLocale } from "@/hooks/useLocale";
import brandStill from "@/assets/home/brand-stilllife.jpg";

export function AboutBlock() {
  const { t } = useLocale();
  return (
    <>
      <section className="px-5 pb-10 pt-16 md:px-10 md:pt-20">
        <div className="mx-auto max-w-[860px]">
          <div className="mb-5 flex items-center gap-2 text-[14px] font-medium">
            <span className="inline-block h-2 w-2 rounded-full bg-foreground" />
            {t("home.about.tag")}
          </div>
          <h2 className="text-[28px] leading-[1.25] tracking-tight md:text-[34px]">
            {t("home.about.headline")}
          </h2>
          <Link
            to="/pages/about"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-85"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-background" />
            {t("home.about.cta")}
          </Link>
        </div>
      </section>

      <section className="px-0 pb-16">
        <img
          src={brandStill}
          alt="Purève Seoul brand collection"
          className="h-auto w-full object-cover"
          loading="lazy"
        />
      </section>
    </>
  );
}
