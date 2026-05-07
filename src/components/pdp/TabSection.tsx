import { useState } from "react";
import type { Product } from "@/data/mockProducts";

export function TabSection({ product }: { product: Product }) {
  const tabs = [
    { id: "ingredients", label: "Ingredients", body: product.ingredients },
    { id: "how", label: "How to use", body: product.howToUse },
    { id: "ship", label: "Shipping & returns", body: "Free worldwide shipping on orders over $80. Easy 30-day returns on unopened products." },
  ];
  const [active, setActive] = useState(tabs[0].id);
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="flex gap-8 border-b">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`relative pb-3 text-sm transition-colors ${active === t.id ? "text-foreground" : "text-muted-foreground"}`}
          >
            {t.label}
            {active === t.id && <span className="absolute -bottom-px left-0 right-0 h-px bg-accent" />}
          </button>
        ))}
      </div>
      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{tabs.find((t) => t.id === active)?.body}</p>
    </section>
  );
}
