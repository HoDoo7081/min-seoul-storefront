import type { Product } from "@/data/mockProducts";

const sample = [
  { name: "Jiwoo K.", rating: 5, title: "Skin feels new", body: "After two weeks my skin looks calmer and more even. The texture is so light." },
  { name: "Mia L.", rating: 5, title: "Holy grail", body: "Replaced three products with this one. Worth every penny." },
  { name: "Hannah W.", rating: 4, title: "Lovely", body: "Very gentle and effective. Wish the bottle was bigger!" },
];

export function ReviewSection({ product }: { product: Product }) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Reviews</p>
          <h2 className="mt-2 font-heading text-3xl">★ {product.rating} · {product.reviewCount} verified</h2>
        </div>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {sample.map((r) => (
          <div key={r.name} className="rounded-card border bg-surface p-5">
            <div className="text-accent">{"★".repeat(r.rating)}<span className="text-border">{"★".repeat(5 - r.rating)}</span></div>
            <h4 className="mt-3 font-heading text-lg">{r.title}</h4>
            <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
            <p className="mt-4 text-xs text-muted-foreground">— {r.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
