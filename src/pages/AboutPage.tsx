import { brands } from "@/data/mockBrands";
import { BrandCard } from "@/components/about/BrandCard";
import { StatsRow } from "@/components/about/StatsRow";

export default function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">About BridgeGroup</p>
        <h1 className="mt-4 font-heading text-5xl leading-tight md:text-7xl">A bridge between Seoul and the world.</h1>
        <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground">
          We are a curated house of independent Korean beauty brands. We work directly with founders to bring their craft to a global audience — without losing the quiet detail that defines it.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <StatsRow />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Our houses</p>
        <h2 className="mt-2 font-heading text-4xl">Three brands, one philosophy</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {brands.map((b) => <BrandCard key={b.handle} brand={b} />)}
        </div>
      </section>
    </div>
  );
}
