import { useState } from "react";
import type { Product } from "@/lib/types";

export function TabSection({ product }: { product: Product }) {
  const tabs = [
    { id: "ingredients", label: "Ingredients", body: product.ingredients ?? "—" },
    { id: "how", label: "How to use", body: product.howToUse ?? "—" },
    {
      id: "ship",
      label: "Shipping & returns",
      body:
        product.caution ??
        "₩80,000 이상 구매 시 무료 배송. 미개봉 상품에 한해 30일 이내 반품 가능.",
    },
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
            {active === t.id && (
              <span className="absolute -bottom-px left-0 right-0 h-px bg-accent" />
            )}
          </button>
        ))}
      </div>
      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
        {tabs.find((t) => t.id === active)?.body}
      </p>
    </section>
  );
}
