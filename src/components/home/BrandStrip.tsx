import { Link } from "@tanstack/react-router";
import { brands } from "@/data/mockBrands";

export function BrandStrip() {
  return (
    <section className="bg-surface px-5 py-14 md:px-10 md:py-[60px]">
      <div className="mx-auto max-w-[1280px]">
        <h2 className="mb-10 text-center font-heading text-[32px]">Our Brands</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {brands.map((b) => (
            <article
              key={b.handle}
              className="rounded-[12px] border bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
            >
              <h3
                className="font-heading text-[28px] leading-none"
                style={{ color: b.accentColor }}
              >
                {b.name}
              </h3>
              <p className="mt-2 text-[14px] italic text-muted-foreground">
                {b.slogan}
              </p>
              <p className="mt-3 text-[13px] leading-[1.6] text-muted-foreground">
                {b.description}
              </p>
              <Link
                to="/collections/$brandHandle"
                params={{ brandHandle: b.handle }}
                className="mt-5 inline-block text-[13px] font-medium text-accent"
              >
                컬렉션 보기 →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
