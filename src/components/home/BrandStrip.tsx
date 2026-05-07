import { Link } from "@tanstack/react-router";
import { brands } from "@/data/mockBrands";

export function BrandStrip() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Our houses</p>
          <h2 className="mt-2 font-heading text-4xl">Three brands, one philosophy</h2>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {brands.map((b) => (
          <Link key={b.handle} to="/collections/$brandHandle" params={{ brandHandle: b.handle }} className="group relative block overflow-hidden rounded-card">
            <div className="aspect-[4/5]">
              <img src={b.image} alt={b.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 p-6 text-white">
              <p className="text-[10px] uppercase tracking-widest opacity-80">House</p>
              <h3 className="font-heading text-2xl">{b.name}</h3>
              <p className="text-sm opacity-90">{b.tagline}</p>
            </div>
            <div className="absolute right-4 top-4 h-10 w-10 rounded-full" style={{ backgroundColor: b.colorVar }} />
          </Link>
        ))}
      </div>
    </section>
  );
}
