import { Link } from "@tanstack/react-router";
import { Button } from "@/components/common/Button";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
        <div className="flex flex-col justify-center">
          <p className="mb-5 text-xs uppercase tracking-[0.3em] text-accent">K-Beauty · Curated House</p>
          <h1 className="font-heading text-5xl leading-[1.05] tracking-tight md:text-7xl">
            A quieter way<br />to wear <em className="text-accent not-italic">beauty</em>.
          </h1>
          <p className="mt-6 max-w-md text-base text-muted-foreground">
            BridgeGroup brings together three Korean houses — The Mute, Aesthein, and Giclée — into one carefully composed ritual.
          </p>
          <div className="mt-10 flex gap-3">
            <Link to="/collections/$brandHandle" params={{ brandHandle: "the-mute" }}><Button size="lg">Shop the edit</Button></Link>
            <Link to="/pages/about"><Button size="lg" variant="outline">Our story</Button></Link>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-card md:aspect-auto">
          <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1400&q=85" alt="K-Beauty editorial" className="h-full w-full object-cover" />
          <div className="absolute bottom-6 left-6 right-6 rounded-card bg-background/90 px-5 py-4 backdrop-blur">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Featured release</p>
            <p className="font-heading text-lg">Hanbang Glow Serum — Aesthein</p>
          </div>
        </div>
      </div>
    </section>
  );
}
