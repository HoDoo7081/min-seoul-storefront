import { Link } from "@tanstack/react-router";
import { Button } from "@/components/common/Button";

export function BrandStoryCTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid items-center gap-12 overflow-hidden rounded-card bg-foreground p-10 text-background md:grid-cols-2 md:p-16">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-accent">The bridge</p>
          <h2 className="mt-3 font-heading text-4xl md:text-5xl">From Seoul ateliers to your shelf.</h2>
          <p className="mt-5 max-w-md text-sm opacity-80">
            We work directly with founders, formulators, and artisans across Korea — translating their craft for the world without losing the quiet detail that defines it.
          </p>
          <div className="mt-8">
            <Link to="/pages/about"><Button variant="accent" size="lg">Read our story</Button></Link>
          </div>
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-card">
          <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=85" alt="Atelier" className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}
