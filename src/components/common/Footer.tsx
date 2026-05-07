import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div>
          <div className="font-heading text-2xl">BridgeGroup<span className="text-accent">.</span></div>
          <p className="mt-3 text-sm text-muted-foreground">A curated house of Korean beauty brands. Crafted in Seoul. Shipped worldwide.</p>
        </div>
        <div>
          <h5 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Brands</h5>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/collections/$brandHandle" params={{ brandHandle: "the-mute" }}>The Mute</Link></li>
            <li><Link to="/collections/$brandHandle" params={{ brandHandle: "aesthein" }}>Aesthein</Link></li>
            <li><Link to="/collections/$brandHandle" params={{ brandHandle: "giclee" }}>Giclée</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Company</h5>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/pages/about">About</Link></li>
            <li>Press</li>
            <li>Stockists</li>
          </ul>
        </div>
        <div>
          <h5 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Newsletter</h5>
          <p className="mt-4 text-sm text-muted-foreground">Rituals, releases, and quiet stories — monthly.</p>
          <form className="mt-3 flex gap-2">
            <input className="h-10 flex-1 rounded-btn border bg-background px-3 text-sm outline-none focus:border-accent" placeholder="you@email.com" />
            <button className="h-10 rounded-btn bg-foreground px-4 text-sm text-background">Join</button>
          </form>
        </div>
      </div>
      <div className="border-t py-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} BridgeGroup. All rights reserved.</div>
    </footer>
  );
}
