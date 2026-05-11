import { Star } from "lucide-react";
import type { Product, LocalizedString } from "@/lib/types";
import { useLocale } from "@/hooks/useLocale";

const sample: { name: string; date: string; rating: number; body: LocalizedString }[] = [
  {
    name: "Jiwoo K.",
    date: "2026.04.21",
    rating: 5,
    body: {
      ko: "2주 사용 후 피부 결이 한층 정돈됐어요. 제형도 가벼워서 매일 부담없이 쓸 수 있어요.",
      en: "After two weeks my skin texture looks noticeably smoother. The lightweight feel makes it easy to use daily.",
      zh: "使用两周后肌肤纹理明显更细腻。质地轻盈，每天使用毫无负担。",
    },
  },
  {
    name: "Mia L.",
    date: "2026.04.10",
    rating: 5,
    body: {
      ko: "이거 하나로 제품 세 개를 대체했어요. 가격값을 충분히 합니다.",
      en: "Replaced three products with this one. Worth every penny.",
      zh: "一瓶搞定三件产品。物超所值。",
    },
  },
  {
    name: "한나 W.",
    date: "2026.03.30",
    rating: 4,
    body: {
      ko: "순하면서도 효과가 확실해요. 용량이 조금 더 컸으면 좋겠어요!",
      en: "Gentle yet effective. Wish the bottle were a bit larger!",
      zh: "温和又有效。希望容量再大一些！",
    },
  },
];

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          color="#f4b942"
          fill={n <= rating ? "#f4b942" : "transparent"}
          strokeWidth={1.5}
        />
      ))}
    </span>
  );
}

export function ReviewSection({ product }: { product: Product }) {
  const { t, tr } = useLocale();
  const buckets = [5, 4, 3, 2, 1].map((star, i) => ({
    star,
    pct: [62, 24, 9, 3, 2][i],
  }));

  return (
    <section
      id="reviews"
      className="mx-auto mt-16 max-w-[1280px] px-5 md:px-10"
    >
      <h2 className="font-heading text-[28px]">{t("review.title")}</h2>

      <div className="mt-6 grid gap-10 md:grid-cols-[280px_1fr] md:gap-10">
        <div>
          <div className="font-heading" style={{ fontSize: 64, lineHeight: 1 }}>
            {product.rating.toFixed(1)}
          </div>
          <div className="mt-2">
            <Stars rating={Math.round(product.rating)} size={18} />
          </div>
          <p className="mt-2 text-[13px] text-muted-foreground">
            총 {product.reviewCount}개의 리뷰
          </p>
        </div>

        <div className="space-y-2">
          {buckets.map((b) => (
            <div key={b.star} className="flex items-center gap-3 text-[12px]">
              <span className="w-7 text-muted-foreground">{b.star}★</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${b.pct}%`,
                    backgroundColor: "var(--color-accent)",
                  }}
                />
              </div>
              <span className="w-10 text-right text-muted-foreground">
                {Math.round((product.reviewCount * b.pct) / 100)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {sample.map((r) => (
          <article key={r.name} className="rounded-[12px] border bg-surface p-5">
            <div className="flex items-center justify-between text-[13px]">
              <span className="font-medium">{r.name}</span>
              <span className="text-muted-foreground">{r.date}</span>
            </div>
            <div className="mt-1">
              <Stars rating={r.rating} />
            </div>
            <p className="mt-2 text-[14px] leading-[1.7] text-muted-foreground">
              {r.body}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button className="rounded-btn border px-8 py-3 text-sm transition-colors hover:bg-foreground hover:text-background">
          리뷰 더보기
        </button>
      </div>
    </section>
  );
}
