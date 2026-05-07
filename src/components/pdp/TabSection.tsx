import { useState } from "react";
import type { Product } from "@/lib/types";

const TABS = [
  { id: "details", label: "상세정보" },
  { id: "ingredients", label: "성분" },
  { id: "how", label: "사용방법" },
  { id: "caution", label: "주의사항" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function TabSection({ product }: { product: Product }) {
  const [active, setActive] = useState<TabId>("details");

  const body =
    active === "details"
      ? product.description
      : active === "ingredients"
        ? product.ingredients ?? "성분 정보가 곧 업데이트됩니다."
        : active === "how"
          ? product.howToUse ?? "사용 방법 정보가 곧 업데이트됩니다."
          : product.caution ?? "특별한 주의사항이 없습니다.";

  return (
    <section className="mx-auto mt-20 max-w-[900px] px-5 md:px-10">
      <div className="flex flex-wrap gap-x-8 border-b">
        {TABS.map((t) => {
          const isActive = t.id === active;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className="relative -mb-px py-3 text-[14px] transition-colors"
              style={{
                borderBottom: `2px solid ${isActive ? "var(--color-primary)" : "transparent"}`,
                color: isActive ? "var(--color-foreground)" : "var(--color-muted-foreground)",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div key={active} className="animate-fade-in pt-8">
        {active === "how" && product.howToUse ? (
          <ol className="list-decimal space-y-2 pl-5 text-[14px] leading-[1.9] text-foreground">
            {product.howToUse.split(/(?<=[.。])\s+/).map((step, i) =>
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
