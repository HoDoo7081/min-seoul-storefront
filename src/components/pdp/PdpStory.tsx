import { useState } from "react";
import type { Product } from "@/lib/types";
import { useLocale } from "@/hooks/useLocale";

/**
 * Figma-style content blocks for the PDP body.
 * Generates "feature pillars" and "main ingredients" automatically from
 * each product's existing data so the same template fits all 9 PDPs.
 */

function splitIntoChunks(text: string, n: number): string[] {
  const sentences = text
    .split(/(?<=[.。!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (sentences.length <= n) return sentences;
  const out: string[] = [];
  const step = Math.ceil(sentences.length / n);
  for (let i = 0; i < n; i++) {
    out.push(sentences.slice(i * step, (i + 1) * step).join(" "));
  }
  return out.filter(Boolean);
}

function deriveBenefits(product: Product, fullDesc: string, t: (k: string) => string) {
  const chunks = splitIntoChunks(fullDesc, 3);
  const tagPool = product.tags
    .filter((tag) => tag.length > 1 && tag.length < 22 && !/^\d+$/.test(tag))
    .slice(0, 3);
  const fallbacks = [
    t("pdp.pillar.daily") || "Daily Skin Care",
    t("pdp.pillar.targeted") || "Targeted Benefits",
    t("pdp.pillar.trusted") || "Trusted Formula",
  ];
  const headings = [0, 1, 2].map((i) => {
    const tag = tagPool[i];
    if (!tag) return fallbacks[i];
    const isCJK = /[\u3000-\u9fff]/.test(tag);
    return isCJK ? tag : tag.charAt(0).toUpperCase() + tag.slice(1);
  });
  return [0, 1, 2].map((i) => ({
    heading: headings[i],
    body: chunks[i] || "",
  }));
}

function deriveIngredients(product: Product, ingredientsText: string) {
  if (!ingredientsText) return [] as { name: string; body: string }[];
  // Split on common separators
  const items = ingredientsText
    .split(/[,;·、，\n]+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 6);
  // Pair consecutive items so we get a heading + body
  if (items.length === 0) return [];
  if (items.length <= 3) {
    return items.map((name) => ({
      name,
      body: `${name} works with the ${product.vendor} formula to support healthy, balanced skin.`,
    }));
  }
  // 4-6 items → first item as name, rest as body chunks for variety
  const grouped: { name: string; body: string }[] = [];
  for (let i = 0; i < Math.min(3, Math.floor(items.length / 2)); i++) {
    grouped.push({
      name: items[i * 2],
      body: items[i * 2 + 1] ?? "",
    });
  }
  return grouped;
}

const SOFT_COLORS = [
  "linear-gradient(135deg, #eef3f9 0%, #d8e3f1 100%)",
  "linear-gradient(135deg, #f7ece6 0%, #ecd9cb 100%)",
  "linear-gradient(135deg, #eef0ec 0%, #d9dfd6 100%)",
];

export function PdpStory({ product }: { product: Product }) {
  const { t, tr } = useLocale();
  const fullDesc = tr(product.description) || tr(product.shortDescription) || "";
  const ingredientsText = product.ingredients ? tr(product.ingredients) : "";
  const howToText = product.howToUse ? tr(product.howToUse) : "";
  const cautionText = product.caution ? tr(product.caution) : "";

  const benefits = deriveBenefits(product, fullDesc, t);
  const ingredients = deriveIngredients(product, ingredientsText);
  const [activeIng, setActiveIng] = useState(0);

  return (
    <section className="mx-auto max-w-[1280px] px-5 pb-10 pt-4 md:px-10">
      {/* Title block */}
      <h2 className="text-[28px] font-semibold tracking-tight md:text-[34px]">
        {tr(product.title)}
      </h2>

      {/* 3 benefit pillars */}
      {benefits.some((b) => b.body) && (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {benefits.map((b, i) => (
            <article key={i}>
              <div
                className="aspect-[4/3] w-full overflow-hidden rounded-[2px]"
                style={{ background: SOFT_COLORS[i % SOFT_COLORS.length] }}
              >
                {product.images[i] ? (
                  <img
                    src={product.images[Math.min(i, product.images.length - 1)].url}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
              <h3 className="mt-4 text-[14px] font-semibold">{b.heading}</h3>
              <p className="mt-2 text-[13px] leading-[1.7] text-muted-foreground">
                {b.body}
              </p>
            </article>
          ))}
        </div>
      )}

      {/* Main Ingredients */}
      {ingredients.length > 0 && (
        <div className="mt-20">
          <h2 className="text-[24px] font-semibold tracking-tight md:text-[28px]">
            {t("pdp.mainIngredients")}
          </h2>
          <div className="mt-8 grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div
              key={activeIng}
              className="aspect-square w-full overflow-hidden rounded-[2px] animate-fade-in"
              style={{
                background: SOFT_COLORS[activeIng % SOFT_COLORS.length],
              }}
            />
            <div>
              <h3 className="text-[22px] font-semibold tracking-tight md:text-[26px]">
                {ingredients[activeIng].name}
              </h3>
              <p className="mt-3 text-[13px] leading-[1.8] text-muted-foreground">
                {ingredients[activeIng].body}
              </p>
            </div>
          </div>

          {/* Tab strip */}
          <div className="mt-8 grid grid-cols-3 border-t border-border">
            {ingredients.slice(0, 3).map((ing, i) => {
              const active = i === activeIng;
              return (
                <button
                  key={i}
                  onClick={() => setActiveIng(i)}
                  className="border-t-2 py-4 text-[12px] transition-colors"
                  style={{
                    borderColor: active
                      ? "var(--color-foreground)"
                      : "transparent",
                    color: active
                      ? "var(--color-foreground)"
                      : "var(--color-muted-foreground)",
                    fontWeight: active ? 600 : 400,
                    marginTop: "-1px",
                  }}
                >
                  {ing.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Details / How to / Caution — accordion-lite (open all) */}
      <div className="mt-20 grid gap-10 md:grid-cols-2">
        {howToText && (
          <div>
            <h3 className="text-[16px] font-semibold uppercase tracking-[0.08em]">
              {t("pdp.tab.howto")}
            </h3>
            <p className="mt-3 whitespace-pre-line text-[13px] leading-[1.9] text-muted-foreground">
              {howToText}
            </p>
          </div>
        )}
        {cautionText && (
          <div>
            <h3 className="text-[16px] font-semibold uppercase tracking-[0.08em]">
              {t("pdp.tab.caution")}
            </h3>
            <p className="mt-3 whitespace-pre-line text-[13px] leading-[1.9] text-muted-foreground">
              {cautionText}
            </p>
          </div>
        )}
        {ingredientsText && (
          <div className="md:col-span-2">
            <h3 className="text-[16px] font-semibold uppercase tracking-[0.08em]">
              {t("pdp.tab.ingredients")}
            </h3>
            <p className="mt-3 text-[12px] leading-[2] text-muted-foreground">
              {ingredientsText}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
