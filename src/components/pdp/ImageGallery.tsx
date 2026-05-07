import { useState } from "react";
import type { ProductImage } from "@/lib/types";

export function ImageGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  const cur = images[active];
  return (
    <div>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative w-full overflow-hidden rounded-2xl bg-muted"
        style={{ aspectRatio: "1 / 1" }}
      >
        <img
          key={active}
          src={cur.url}
          alt={cur.altText}
          className="h-full w-full object-cover transition-all duration-[400ms] ease-out animate-fade-in"
          style={{ transform: hover ? "scale(1.08)" : "scale(1)" }}
        />
      </div>

      <div className="mt-3 flex gap-2">
        {images.slice(0, 4).map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="overflow-hidden rounded-lg transition-colors"
            style={{
              width: 72,
              height: 72,
              border: `1.5px solid ${i === active ? "var(--color-primary)" : "transparent"}`,
            }}
          >
            <img
              src={img.url}
              alt={img.altText}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.06]"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
