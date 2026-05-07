import { useState } from "react";
import type { ProductImage } from "@/lib/types";

export function ImageGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);
  const cur = images[active];
  return (
    <div className="grid gap-4 md:grid-cols-[80px_1fr]">
      <div className="order-2 flex gap-3 md:order-1 md:flex-col">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`aspect-square w-20 overflow-hidden rounded-md border-2 ${active === i ? "border-accent" : "border-transparent"}`}
          >
            <img src={img.url} alt={img.altText} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
      <div className="order-1 aspect-[4/5] overflow-hidden rounded-card bg-muted md:order-2">
        <img src={cur.url} alt={cur.altText} className="h-full w-full object-cover" />
      </div>
    </div>
  );
}
