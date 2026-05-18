import { useState } from "react";
import { X } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

const MESSAGES = {
  ko: ["무료배송 ₩50,000 이상 주문 시", "K-Beauty 브랜드 3개 한 곳에서 — Purève Seoul", "신제품 출시 🌿 Giclee Rosehip Oil"],
  en: ["Free shipping on orders over ₩50,000", "Three K-Beauty houses, one destination — Purève Seoul", "New arrival 🌿 Giclee Rosehip Oil"],
  zh: ["满₩50,000免运费", "三个K-Beauty品牌，一站购齐 — Purève Seoul", "新品上市 🌿 Giclee 玫瑰果油"],
};

export function AnnouncementBar() {
  const { locale } = useLocale();
  const [visible, setVisible] = useState(true);
  const [idx, setIdx] = useState(0);

  if (!visible) return null;

  const msgs = MESSAGES[locale as keyof typeof MESSAGES] ?? MESSAGES.ko;

  const prev = () => setIdx((i) => (i - 1 + msgs.length) % msgs.length);
  const next = () => setIdx((i) => (i + 1) % msgs.length);

  return (
    <div className="relative flex h-9 items-center justify-center bg-foreground text-background text-[12px] tracking-wide px-12">
      {msgs.length > 1 && (
        <button
          onClick={prev}
          aria-label="Previous announcement"
          className="absolute left-3 text-background/60 hover:text-background transition-colors text-base leading-none"
        >
          ‹
        </button>
      )}

      <span className="truncate">{msgs[idx]}</span>

      {msgs.length > 1 && (
        <button
          onClick={next}
          aria-label="Next announcement"
          className="absolute left-10 text-background/60 hover:text-background transition-colors text-base leading-none"
        >
          ›
        </button>
      )}

      <button
        onClick={() => setVisible(false)}
        aria-label="Close announcement"
        className="absolute right-3 text-background/60 hover:text-background transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
}
