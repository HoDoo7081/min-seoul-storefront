import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/common/ProductCard";
import { products } from "@/data/mockProducts";
import { useLocale } from "@/hooks/useLocale";

export function BestSellers() {
  const { t } = useLocale();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const items = products.filter((p) => p.isBestSeller).slice(0, 8);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = (card?.offsetWidth ?? 280) + 16;
    el.scrollBy({ left: dir * step * 2, behavior: "smooth" });
  };

  return (
    <section
      className="px-5 py-16 md:px-10 md:py-20"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-heading text-[32px]">{t("home.best.title")}</h2>
          <Link
            to="/collections/$brandHandle"
            params={{ brandHandle: "the-mute" }}
            className="text-sm text-accent"
          >
            {t("home.best.link")}
          </Link>
        </div>

        <div className="relative">
          <div
            ref={scrollerRef}
            className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {items.map((p) => (
              <div
                key={p.id}
                data-card
                className="w-[70%] flex-shrink-0 snap-start sm:w-[45%] md:w-[calc((100%-3rem)/4)]"
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>

          <button
            aria-label="Previous"
            onClick={() => scrollBy(-1)}
            className="absolute -left-5 top-[40%] hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border bg-background shadow-md transition-colors hover:bg-foreground hover:text-background md:flex"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            aria-label="Next"
            onClick={() => scrollBy(1)}
            className="absolute -right-5 top-[40%] hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border bg-background shadow-md transition-colors hover:bg-foreground hover:text-background md:flex"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
