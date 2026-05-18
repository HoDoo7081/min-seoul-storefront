import { useState } from "react";
import type { Product } from "@/lib/types";
import { useLocale } from "@/hooks/useLocale";

type TabId = "details" | "ingredients" | "how" | "caution";

export function TabSection({ product }: { product: Product }) {
  const { t, tr } = useLocale();
  const [active, setActive] = useState<TabId>("details");

  const TABS: { id: TabId; label: string }[] = [
    { id: "details", label: t("pdp.tab.detail") },
    { id: "ingredients", label: t("pdp.tab.ingredients") },
    { id: "how", label: t("pdp.tab.howto") },
    { id: "caution", label: t("pdp.tab.caution") },
  ];

  const howToText = tr(product.howToUse);

  const body =
    active === "details"
      ? tr(product.description)
      : active === "ingredients"
        ? (product.ingredients ? tr(product.ingredients) : t("pdp.tab.ingredients.empty"))
        : active === "how"
          ? (howToText || t("pdp.tab.howto.empty"))
          : (product.caution ? tr(product.caution) : t("pdp.tab.caution.empty"));

  return (
    <section className="mx-auto mt-20 max-w-[900px] px-5 md:px-10">
      <div className="flex gap-6 overflow-x-auto border-b [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-8">
        {TABS.map((tb) => {
          const isActive = tb.id === active;
          return (
            <button
              key={tb.id}
              onClick={() => setActive(tb.id)}
              className="relative -mb-px py-3 text-[14px] transition-colors"
              style={{
                borderBottom: `2px solid ${isActive ? "var(--color-primary)" : "transparent"}`,
                color: isActive ? "var(--color-foreground)" : "var(--color-muted-foreground)",
              }}
            >
              {tb.label}
            </button>
          );
        })}
      </div>

      <div key={active} className="animate-fade-in pt-8">
        {active === "how" && howToText ? (
          <ol className="list-decimal space-y-2 pl-5 text-[14px] leading-[1.9] text-foreground">
            {howToText.split(/(?<=[.。])\s+/).map((step: string, i: number) =>
              step.trim() ? <li key={i}>{step.trim()}</li> : null,
            )}
          </ol>
        ) : active === "ingredients" ? (
          <p className="text-[13px] text-foreground" style={{ lineHeight: 2 }}>
            {body}
          </p>
        ) : active === "caution" ? (
          <p className="text-[14px] leading-[1.8] text-muted-foreground">{body}</p>
        ) : (
          <p className="text-[14px] leading-[1.8]">{body}</p>
        )}
      </div>
    </section>
  );
}
