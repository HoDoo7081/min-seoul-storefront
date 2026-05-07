import { Link } from "@tanstack/react-router";
import { useCart } from "@/hooks/useCart";

export function GNB() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="font-heading text-xl tracking-tight">
          BridgeGroup<span className="text-accent">.</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          <Link to="/collections/$brandHandle" params={{ brandHandle: "the-mute" }} className="hover:text-accent transition-colors">The Mute</Link>
          <Link to="/collections/$brandHandle" params={{ brandHandle: "aesthein" }} className="hover:text-accent transition-colors">Aesthein</Link>
          <Link to="/collections/$brandHandle" params={{ brandHandle: "giclee" }} className="hover:text-accent transition-colors">Giclée</Link>
          <Link to="/pages/about" className="hover:text-accent transition-colors">About</Link>
        </nav>
        <Link to="/cart" className="relative text-sm font-medium">
          Cart
          {count > 0 && (
            <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1.5 text-xs text-background">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
