import { useState } from "react";
import type { ProductImage } from "@/lib/types";

export function ImageGallery({ images, aspectClass = "aspect-square" }: { images: ProductImage[]; aspectClass?: string }) {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  const cur = images[active];
  if (!cur) return <div className={`${aspectClass} w-full bg-muted/40`} />;

  return (
    <div className="flex gap-3 md:gap-4">
      {/* Vertical thumbnail strip — Figma layout */}
      <div className="hidden w-[72px] flex-col gap-2 md:flex">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="aspect-square overflow-hidden border bg-white transition-all duration-200"
            style={{
              borderColor:
                i === active ? "var(--color-foreground)" : "var(--color-border)",
              opacity: i === active ? 1 : 0.65,
            }}
            aria-label={`View image ${i + 1}`}
          >
            <img
              src={img.url}
              alt={img.altText}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main image — square, contain */}
      <div className="flex-1">
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="relative aspect-square w-full overflow-hidden border border-border bg-white"
        >
          <img
            key={active}
            src={cur.url}
            alt={cur.altText}
            className="absolute inset-0 h-full w-full object-contain transition-transform duration-[400ms] ease-out animate-fade-in"
            style={{ transform: hover ? "scale(1.02)" : "scale(1)" }}
          />
        </div>

        {/* Mobile horizontal thumbs */}
        {images.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 md:hidden [&::-webkit-scrollbar]:hidden">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="aspect-square w-[64px] flex-shrink-0 overflow-hidden border bg-white"
                style={{
                  borderColor:
                    i === active ? "var(--color-foreground)" : "var(--color-border)",
                  opacity: i === active ? 1 : 0.65,
                }}
              >
                <img
                  src={img.url}
                  alt={img.altText}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
