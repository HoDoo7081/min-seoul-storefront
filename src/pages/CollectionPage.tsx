import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, PackageOpen } from "lucide-react";
import { brands } from "@/data/mockBrands";
import { products } from "@/data/mockProducts";
import { ProductCard } from "@/components/common/ProductCard";
import { useLocale, resolveLocalized } from "@/hooks/useLocale";
import type { Product, Locale } from "@/lib/types";

const CATEGORY_KEYS = ["all", "serum", "cream", "toner", "sun", "body"] as const;
type Category = (typeof CATEGORY_KEYS)[number];

const CATEGORY_TAGS: Record<Exclude<Category, "all">, string[]> = {
  serum: ["세럼", "serum", "精华"],
  cream: ["크림", "cream", "面霜"],
  toner: ["토너", "toner", "爽肤"],
  sun: ["선크림", "선케어", "sun", "防晒"],
  body: ["바디", "body", "오일", "oil", "身体"],
};

type Sort = "latest" | "price-asc" | "price-desc" | "popular";
const SORT_KEYS: Sort[] = ["latest", "price-asc", "price-desc", "popular"];

const PAGE_SIZE = 12;
const PAGE_STEP = 6;

function matchCategory(p: Product, cat: Category, locale: Locale): boolean {
  if (cat === "all") return true;
  const title = resolveLocalized(p.title, locale).toLowerCase();
  const haystack = [title, ...p.tags.map((t) => t.toLowerCase())].join(" ");
  return CATEGORY_TAGS[cat].some((t) => haystack.includes(t.toLowerCase()));
}

export default function CollectionPage({
  brandHandle,
}: {
  brandHandle?: string;
}) {
  const { t, tr, locale } = useLocale();
  const isAll = !brandHandle || brandHandle === "all";
  const brand = brands.find((b) => b.handle === brandHandle);

  const [category, setCategory] = useState<Category>("all");
  const [sort, setSort] = useState<Sort>("latest");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    let list = isAll
      ? products.slice()
      : products.filter((p) => p.brandHandle === brandHandle);
    list = list.filter((p) => matchCategory(p, category, locale));
    switch (sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "popular": list.sort((a, b) => b.reviewCount - a.reviewCount); break;
      case "latest":
      default: list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    }
    return list;
  }, [isAll, brandHandle, category, sort, locale]);

  const shown = filtered.slice(0, visible);
  const remaining = Math.max(0, filtered.length - visible);

  const accent = brand?.accentColor ?? "#2d2d2d";
  const headerImage = brand
    ? `https://placehold.co/1440x320/${accent.replace("#", "")}/ffffff?text=${encodeURIComponent(brand.name)}`
    : "https://placehold.co/1440x320/2d2d2d/ffffff?text=All+Brands";
  const headerName = brand?.name ?? t("coll.allBrands");
  const headerSlogan = brand ? tr(brand.slogan) : t("coll.allBrands.sub");

  return (
    <div>
      <section className="relative w-full overflow-hidden" style={{ height: "var(--coll-h, 220px)" }}>
        <style>{`@media (min-width: 768px) { :root { --coll-h: 320px; } }`}</style>
        <img src={headerImage} alt={headerName} className="h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.5) 100%)" }} />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1280px] px-5 pb-8 md:px-10 md:pb-10">
          <h1 className="font-heading text-white" style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 400 }}>
            {headerName}
          </h1>
          <p className="mt-2 text-[16px] italic text-white/70">{headerSlogan}</p>
        </div>
      </section>

      <div className="sticky z-30 border-b bg-background" style={{ top: 64 }}>
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3 px-5 py-3 md:px-10">
          <div className="flex flex-wrap gap-2">
            {CATEGORY_KEYS.map((c) => {
              const active = c === category;
              return (
                <button
                  key={c}
                  onClick={() => { setCategory(c); setVisible(PAGE_SIZE); }}
                  className="rounded-full border px-4 py-1.5 text-[13px] transition-all duration-200"
                  style={{
                    backgroundColor: active ? "var(--color-primary)" : "var(--color-background)",
                    color: active ? "var(--color-primary-foreground)" : "var(--color-foreground)",
                    borderColor: active ? "var(--color-primary)" : "var(--color-border)",
                  }}
                >
                  {t(`coll.cat.${c}`)}
                </button>
              );
            })}
          </div>

          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="appearance-none rounded-md border bg-background py-1.5 pl-3 pr-8 text-[13px]"
            >
              {SORT_KEYS.map((s) => (
                <option key={s} value={s}>{t(`coll.sort.${s}`)}</option>
              ))}
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-[1280px] px-5 py-10 md:px-10">
        <p className="mb-5 text-[13px] text-muted-foreground">
          {t("coll.count").replace("{n}", String(filtered.length))}
        </p>

        {filtered.length === 0 ? (
          <div className="mt-20 flex flex-col items-center justify-center text-center">
            <PackageOpen size={56} className="text-muted-foreground/60" />
            <p className="mt-4 text-base">{t("coll.empty")}</p>
            <button
              onClick={() => { setCategory("all"); setVisible(PAGE_SIZE); }}
              className="mt-5 rounded-btn border px-5 py-2.5 text-sm transition-colors hover:bg-foreground hover:text-background"
            >
              {t("coll.viewAll")}
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {shown.map((p) => (<ProductCard key={p.id} product={p} />))}
            </div>

            {remaining > 0 && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => setVisible((v) => v + PAGE_STEP)}
                  className="rounded-btn border px-10 py-3 text-sm transition-colors hover:bg-foreground hover:text-background"
                >
                  {t("coll.more").replace("{n}", String(remaining))}
                </button>
              </div>
            )}
          </>
        )}

        {isAll && (
          <Link to="/collections/$brandHandle" params={{ brandHandle: "the-mute" }} className="sr-only">
            jump to brand
          </Link>
        )}
      </section>
    </div>
  );
}
