import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { PackageOpen, AlertTriangle, RefreshCw } from "lucide-react";
import { brands } from "@/data/mockBrands";
import { useProducts } from "@/hooks/useProducts";
import { useShopifyHealth } from "@/hooks/useShopifyHealth";
import { ProductCard } from "@/components/common/ProductCard";
import { useLocale, resolveLocalized } from "@/hooks/useLocale";
import type { Product, Locale } from "@/lib/types";

type Category = "skincare" | "sets";

const SET_TAGS = ["set", "세트", "套装"];
const SKINCARE_TAGS = ["serum", "cream", "toner", "cleanser", "essence", "세럼", "크림", "토너", "클렌저", "에센스"];

function isSet(p: Product, locale: Locale): boolean {
  const title = resolveLocalized(p.title, locale).toLowerCase();
  const haystack = [title, ...p.tags.map((t) => t.toLowerCase())].join(" ");
  return SET_TAGS.some((t) => haystack.includes(t.toLowerCase()));
}

function matchCategory(p: Product, cat: Category | null, locale: Locale): boolean {
  if (!cat) return true;
  if (cat === "sets") return isSet(p, locale);
  if (cat === "skincare") return !isSet(p, locale);
  return true;
}

export default function CollectionPage({
  brandHandle,
}: {
  brandHandle?: string;
}) {
  const { t, locale } = useLocale();
  const isAll = !brandHandle || brandHandle === "all";
  const brand = brands.find((b) => b.handle === brandHandle);

  const [category, setCategory] = useState<Category | null>(null);
  const queryClient = useQueryClient();
  const health = useShopifyHealth();
  const { data: products = [], isLoading } = useProducts();
  const paymentRequired = health.data?.ok === false && health.data.code === "PAYMENT_REQUIRED";

  const handleRetry = () => {
    health.refetch();
    queryClient.invalidateQueries({ queryKey: ["products"] });
  };

  const HANDLE_ORDER = [
    "derma-sense-cleansing-gel",
    "atp-nad-synergy-velvet-cream",
    "4gf-supreme-plumping-essence",
    "face-fit-tox-kit-7ml-3-vials",
  ];
  const orderIndex = (h: string) => {
    const i = HANDLE_ORDER.indexOf(h);
    return i === -1 ? 999 : i;
  };

  const filtered = useMemo(() => {
    const base = isAll
      ? products.slice()
      : products.filter((p) => p.brandHandle === brandHandle);
    return base
      .filter((p) => matchCategory(p, category, locale))
      .sort((a, b) => orderIndex(a.handle) - orderIndex(b.handle));
  }, [isAll, brandHandle, category, locale, products]);

  const headerName = brand?.name ?? (isAll ? "Products" : t("coll.allBrands"));

  return (
    <div>
      {/* Hero — soft gradient banner */}
      <section
        className="relative w-full"
        style={{
          background:
            "linear-gradient(180deg, #d6e2f0 0%, #c8d5e4 60%, #b9c8db 100%)",
        }}
      >
        <div className="mx-auto max-w-[1280px] px-5 pb-10 pt-24 md:px-10 md:pb-16 md:pt-32">
          <nav className="text-[12px] text-foreground/70" aria-label="Breadcrumb">
            <a href="/" className="hover:text-foreground">
              Home
            </a>
            <span className="mx-2 text-foreground/40">{">"}</span>
            <span className="text-foreground">{headerName}</span>
          </nav>
          <h1 className="mt-3 text-[28px] font-normal leading-none tracking-tight sm:text-[36px] md:mt-4 md:text-[56px]">
            {headerName}
          </h1>
        </div>
      </section>

      {/* Filter bar */}
      <div className="mx-auto max-w-[1280px] px-5 pt-8 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-6">
          <div className="flex items-center gap-2">
            {(
              [
                { id: "skincare", label: "Skincare" },
                { id: "sets", label: "Sets" },
              ] as const
            ).map((c) => {
              const active = c.id === category;
              return (
                <button
                  key={c.id}
                  onClick={() => setCategory(active ? null : c.id)}
                  className="rounded-full border px-3 py-1 text-[11px] transition-colors sm:px-5 sm:py-1.5 sm:text-[13px]"
                  style={{
                    backgroundColor: active ? "var(--color-foreground)" : "transparent",
                    color: active ? "var(--color-background)" : "var(--color-foreground)",
                    borderColor: "var(--color-foreground)",
                  }}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
          <p className="text-[12px] text-muted-foreground">
            Showing {filtered.length} of {products.length} products
          </p>
        </div>
      </div>

      {/* Grid */}
      <section className="mx-auto max-w-[1280px] px-5 py-10 md:px-10 md:py-14">
        {paymentRequired ? (
          <div className="mt-10 flex flex-col items-center justify-center text-center">
            <AlertTriangle size={48} className="text-muted-foreground/60" />
            <p className="mt-4 text-sm font-medium text-foreground">
              Shopify 스토어 결제가 필요합니다
            </p>
            <p className="mt-2 max-w-md text-xs text-muted-foreground/80">
              Storefront API가 402 응답을 반환했습니다. admin.shopify.com에서 결제 플랜을 활성화한 뒤 재시도해 주세요.
            </p>
            <button
              onClick={handleRetry}
              disabled={health.isFetching}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-foreground bg-foreground px-5 py-2 text-[13px] text-background transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              <RefreshCw size={14} className={health.isFetching ? "animate-spin" : ""} />
              스토어 결제 확인 후 재시도
            </button>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-4 md:grid-cols-3 md:gap-x-5 md:gap-y-10 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] animate-pulse bg-muted/40" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center text-center">
            <PackageOpen size={48} className="text-muted-foreground/50" />
            <p className="mt-4 text-sm text-muted-foreground">No products found</p>
            <p className="mt-2 max-w-md text-xs text-muted-foreground/80">
              Add products through your Shopify admin and they will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-4 md:grid-cols-3 md:gap-x-5 md:gap-y-10 lg:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
