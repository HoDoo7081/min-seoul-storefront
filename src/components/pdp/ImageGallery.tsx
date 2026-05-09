import { useState } from "react";
import type { ProductImage } from "@/lib/types";

export function ImageGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);
  const cur = images[active];

  return (
    <div>
      {/* 메인 이미지 — 원본 비율 그대로, 잘림 없음 */}
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="relative w-full overflow-hidden rounded-2xl bg-[#fafaf8]"
      >
        <img
          key={active}
          src={cur.url}
          alt={cur.altText}
          className="h-auto w-full object-contain transition-transform duration-[400ms] ease-out animate-fade-in"
          style={{ transform: hover ? "scale(1.04)" : "scale(1)" }}
        />
      </div>

      {/* 썸네일 — 1장이면 숨김, 여러 장이면 가로 스크롤 */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="flex-shrink-0 overflow-hidden rounded-lg transition-all duration-200"
              style={{
                width: 72,
                height: 54,
                border: `1.5px solid ${i === active ? "var(--color-primary)" : "transparent"}`,
                opacity: i === active ? 1 : 0.6,
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
  );
}
