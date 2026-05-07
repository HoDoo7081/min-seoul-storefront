import type { Product } from "@/lib/types";

const sample = [
  {
    name: "지우 K.",
    rating: 5,
    title: "피부가 새로워졌어요",
    body: "2주 사용 후 피부 결이 한층 정돈됐어요. 제형도 가벼워서 매일 부담없이 써요.",
  },
  {
    name: "Mia L.",
    rating: 5,
    title: "Holy grail",
    body: "Replaced three products with this one. Worth every penny.",
  },
  {
    name: "한나 W.",
    rating: 4,
    title: "마음에 들어요",
    body: "순하면서도 효과가 확실해요. 용량이 조금 더 컸으면 좋겠어요!",
  },
];

export function ReviewSection({ product }: { product: Product }) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Reviews
          </p>
          <h2 className="mt-2 font-heading text-3xl">
            ★ {product.rating} · {product.reviewCount} verified
          </h2>
        </div>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {sample.map((r) => (
          <div key={r.name} className="rounded-card border bg-surface p-5">
            <div className="text-accent">
              {"★".repeat(r.rating)}
              <span className="text-border">{"★".repeat(5 - r.rating)}</span>
            </div>
            <h4 className="mt-3 font-heading text-lg">{r.title}</h4>
            <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
            <p className="mt-4 text-xs text-muted-foreground">— {r.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
