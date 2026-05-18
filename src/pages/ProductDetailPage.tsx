import { useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useProduct } from "@/hooks/useProduct";
import { useProducts } from "@/hooks/useProducts";
import { ImageGallery } from "@/components/pdp/ImageGallery";
import cleansingGel1 from "@/assets/products/cleansing-gel-1.png";
import cleansingGel2 from "@/assets/products/cleansing-gel-2.png";
import cleansingGel3 from "@/assets/products/cleansing-gel-3.png";
import cleansingGel4 from "@/assets/products/cleansing-gel-4.png";
import velvetCream1 from "@/assets/products/velvet-cream-1.jpg";
import velvetCreamCard from "@/assets/products/velvet-cream-card.jpg";
import velvetCreamCard2 from "@/assets/products/velvet-cream-card-2.jpg";
import velvetCreamMain from "@/assets/products/velvet-cream.jpg";
import essenceCard from "@/assets/products/essence-card.jpg";
import essenceCard2 from "@/assets/products/essence-card-2.jpg";
import essence2 from "@/assets/products/essence-2.png";
import essence3 from "@/assets/products/essence-3.jpg";
import essence4 from "@/assets/products/essence-4.jpg";
import essence5 from "@/assets/products/essence-5.jpg";
import antiAgingCard from "@/assets/products/anti-aging-card.jpg";
import antiAgingCard2 from "@/assets/products/anti-aging-card-2.jpg";
import antiAging1 from "@/assets/products/anti-aging-1.jpg";
import antiAging2 from "@/assets/products/anti-aging-2.jpg";
import antiAging3 from "@/assets/products/anti-aging-3.jpg";
import antiAging4 from "@/assets/products/anti-aging-4.jpg";
import homecareSetCard from "@/assets/products/homecare-set-card.jpg";
import homecareSetCard2 from "@/assets/products/homecare-set-card-2.jpg";
import proSetCard from "@/assets/products/pro-set-card.jpg";
import proSetCard2 from "@/assets/products/pro-set-card-2.jpg";
import gicleeCleansingCard from "@/assets/products/giclee-cleansing-card.jpg";
import gicleeCleansingCard2 from "@/assets/products/giclee-cleansing-card-2.jpg";
import gicleeCleanserThumb from "@/assets/products/giclee-cleanser-thumb.jpg";
import gicleeCleanserSq1 from "@/assets/products/giclee-cleanser-sq1.jpg";
import gicleeCleanserSq2 from "@/assets/products/giclee-cleanser-sq2.jpg";
import gicleeCreamCard from "@/assets/products/giclee-cream-card.jpg";
import gicleeCreamCard2 from "@/assets/products/giclee-cream-card-2.jpg";
import gicleeCreamThumb from "@/assets/products/giclee-cream-thumb.jpg";
import gicleeCreamSq1 from "@/assets/products/giclee-cream-sq1.jpg";
import gicleeCreamSq2 from "@/assets/products/giclee-cream-sq2.jpg";
import gicleeBarrierCard from "@/assets/products/giclee-barrier-card.jpg";
import gicleeBarrierSet from "@/assets/products/giclee-barrier-set.png";
import dolidoTonerCard from "@/assets/products/dolido-toner-card.jpg";
import dolidoToner1 from "@/assets/products/dolido-toner-1.jpg";
import dolidoToner2 from "@/assets/products/dolido-toner-2.jpg";
import dolidoToner3 from "@/assets/products/dolido-toner-3.jpg";
import antiAgingBanner from "@/assets/products/anti-aging-banner.png";
import faceFitHero from "@/assets/pdp/face-fit-tox/hero-vials.png";
import faceFitIntroSlide from "@/assets/pdp/face-fit-tox/gallery-slide-intro.png";
import faceFitWhySlide from "@/assets/pdp/face-fit-tox/gallery-slide-why.png";
import faceFitBASlide from "@/assets/pdp/face-fit-tox/gallery-slide-ba.png";

const CUSTOM_GALLERIES: Record<string, string[]> = {
  "derma-sense-cleansing-gel": [cleansingGel1, cleansingGel2, cleansingGel3, cleansingGel4],
  "atp-nad-synergy-velvet-cream": [velvetCreamMain, velvetCream1, velvetCreamCard, velvetCreamCard2],
  "4gf-supreme-plumping-essence": [essenceCard, essence3, essence4, essence5],
  "anti-aging-line-set": [antiAging1, antiAging2, antiAging3, antiAging4],
  "essential-home-care-set-set-of-9": [homecareSetCard, homecareSetCard2],
  "professional-care-set-set-of-10": [proSetCard],
  "the-clinic-ectoin-ph-balancing-gel-cleanser": [gicleeCleanserThumb, gicleeCleanserSq1, gicleeCleanserSq2],
  "the-clinic-ectoin-barrier-restorative-cream": [gicleeCreamThumb, gicleeCreamSq1, gicleeCreamSq2],
  "the-clinic-barrier-line": [gicleeBarrierSet, gicleeBarrierCard],
  "dolido-tea-tree-toner": [dolidoToner1, dolidoToner2, dolidoToner3],
  "face-fit-tox-kit-7ml-3-vials": [faceFitHero, faceFitIntroSlide, faceFitWhySlide, faceFitBASlide],
};
import { ProductInfo } from "@/components/pdp/ProductInfo";
import { PdpStory } from "@/components/pdp/PdpStory";
import { DermaSenseStory } from "@/components/pdp/DermaSenseStory";
import { VelvetCreamStory } from "@/components/pdp/VelvetCreamStory";
import { EssenceStory } from "@/components/pdp/EssenceStory";
import { AntiAgingStory } from "@/components/pdp/AntiAgingStory";
import { HomecareSetStory } from "@/components/pdp/HomecareSetStory";
import { ProSetStory } from "@/components/pdp/ProSetStory";
import { ProSetDetail } from "@/components/pdp/ProSetDetail";
import { GicleeCleanserStory } from "@/components/pdp/GicleeCleanserStory";
import { GicleeCreamStory } from "@/components/pdp/GicleeCreamStory";
import { GicleeCleanserFeatures } from "@/components/pdp/GicleeCleanserFeatures";
import { GicleeBarrierStory } from "@/components/pdp/GicleeBarrierStory";
import { DolidoTonerStory } from "@/components/pdp/DolidoTonerStory";
import { FaceFitToxStory } from "@/components/pdp/FaceFitToxStory";
import { ReviewSection } from "@/components/pdp/ReviewSection";
import { ProductCard } from "@/components/common/ProductCard";
import { useLocale } from "@/hooks/useLocale";
import { StickyBar } from "@/components/pdp/StickyBar";

export default function ProductDetailPage({ handle }: { handle: string }) {
  const { product, isLoading, isError } = useProduct(handle);
  const { t, tr } = useLocale();
  const reviewsRef = useRef<HTMLDivElement | null>(null);
  const addToCartRef = useRef<HTMLDivElement | null>(null);

  const baseImages = useMemo(() => {
    const custom = CUSTOM_GALLERIES[handle];
    if (custom && product) {
      return custom.map((url) => ({ url, altText: tr(product.title) }));
    }
    return product?.images ?? [];
  }, [product, handle, tr]);
  const [extraFirst, setExtraFirst] = useState<string | null>(null);
  const { data: allProducts = [] } = useProducts();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1280px] px-5 pt-8 pb-16 md:px-10 md:pt-12">
        <div className="grid gap-8 md:grid-cols-[1fr_360px] md:gap-12 lg:grid-cols-[1fr_400px]">
          <div className="aspect-square w-full animate-pulse rounded-xl bg-muted/40" />
          <div className="flex flex-col gap-4 pt-2">
            <div className="h-3 w-20 animate-pulse rounded bg-muted/40" />
            <div className="h-7 w-3/4 animate-pulse rounded bg-muted/40" />
            <div className="h-5 w-1/3 animate-pulse rounded bg-muted/40" />
            <div className="mt-4 h-11 w-full animate-pulse rounded bg-muted/40" />
            <div className="h-11 w-full animate-pulse rounded bg-muted/40" />
          </div>
        </div>
      </div>
    );
  }

  if (!product || isError) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="text-lg text-muted-foreground">제품 페이지를 표시할 수 없습니다.</p>
        <p className="mt-2 text-sm text-muted-foreground">Cannot read properties of undefined (reading 'url')</p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => window.location.reload()}
            className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            다시 시도
          </button>
          <Link
            to="/collections/$brandHandle"
            params={{ brandHandle: "all" }}
            className="rounded-full border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            제품 목록으로
          </Link>
        </div>
      </div>
    );
  }

  const titleStr = tr(product.title);
  const galleryImages =
    extraFirst && extraFirst !== baseImages[0]?.url
      ? [{ url: extraFirst, altText: titleStr }, ...baseImages]
      : baseImages;

  const RELATED_OVERRIDES: Record<string, string[]> = {
    "atp-nad-synergy-velvet-cream": [
      "4gf-supreme-plumping-essence",
      "the-clinic-ectoin-barrier-restorative-cream",
      "anti-aging-line-set",
    ],
    "4gf-supreme-plumping-essence": [
      "atp-nad-synergy-velvet-cream",
      "derma-sense-cleansing-gel",
      "anti-aging-line-set",
    ],
    "anti-aging-line-set": [
      "atp-nad-synergy-velvet-cream",
      "the-clinic-ectoin-barrier-restorative-cream",
      "essential-home-care-set-set-of-9",
    ],
    "the-clinic-ectoin-barrier-restorative-cream": [
      "the-clinic-ectoin-ph-balancing-gel-cleanser",
      "derma-sense-cleansing-gel",
      "anti-aging-line-set",
    ],
    "the-clinic-ectoin-ph-balancing-gel-cleanser": [
      "the-clinic-ectoin-barrier-restorative-cream",
      "derma-sense-cleansing-gel",
      "anti-aging-line-set",
    ],
    "the-clinic-barrier-line": [
      "the-clinic-ectoin-ph-balancing-gel-cleanser",
      "the-clinic-ectoin-barrier-restorative-cream",
      "dolido-tea-tree-toner",
    ],
    "dolido-tea-tree-toner": [
      "the-clinic-ectoin-ph-balancing-gel-cleanser",
      "derma-sense-cleansing-gel",
      "the-clinic-barrier-line",
    ],
    "professional-care-set-set-of-10": [
      "the-clinic-barrier-line",
      "derma-sense-cleansing-gel",
      "anti-aging-line-set",
    ],
    "face-fit-tox-kit-7ml-3-vials": [
      "atp-nad-synergy-velvet-cream",
      "derma-sense-cleansing-gel",
      "anti-aging-line-set",
    ],
  };
  const overrideHandles = RELATED_OVERRIDES[handle];
  const related = overrideHandles
    ? (overrideHandles
        .map((h) => allProducts.find((p) => p.handle === h))
        .filter(Boolean) as typeof allProducts)
    : allProducts
        .filter((p) => p.brandHandle === product.brandHandle && p.id !== product.id)
        .slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-[1280px] px-5 pt-8 pb-12 md:px-10 md:pt-12 md:pb-16">
        <div className="grid gap-8 md:grid-cols-[1fr_360px] md:gap-12 lg:grid-cols-[1fr_400px]">
          <div>
            <ImageGallery images={galleryImages} aspectClass={handle === "face-fit-tox-kit-7ml-3-vials" ? "aspect-[2/1]" : "aspect-square"} />
          </div>
          <div className="md:sticky md:top-24 md:self-start">
            {/* Breadcrumb above buy box */}
            <nav
              className="mb-4 text-[12px] text-muted-foreground"
              aria-label="Breadcrumb"
            >
              <Link to="/" className="hover:text-foreground">
                {t("pdp.breadcrumb.home")}
              </Link>
              <span className="mx-1.5 text-muted-foreground/50">{">"}</span>
              <Link
                to="/collections/$brandHandle"
                params={{ brandHandle: "all" }}
                className="hover:text-foreground"
              >
                Products
              </Link>
              <span className="mx-1.5 text-muted-foreground/50">{">"}</span>
              <Link
                to="/collections/$brandHandle"
                params={{ brandHandle: product.brandHandle }}
                className="hover:text-foreground"
              >
                {product.vendor}
              </Link>
            </nav>
            <div ref={addToCartRef}>
              <ProductInfo
                product={product}
                descriptionOverride={
                  handle === "derma-sense-cleansing-gel"
                    ? "Removes excess sebum and waste secreted overnight, leaving the skin clean and fresh. This complete care cleansing gel gently purifies the skin while helping maintain a clear, balanced complexion."
                    : handle === "atp-nad-synergy-velvet-cream"
                      ? "Recharges your skin's cellular energy with ATP, NAD⁺, NMN, and CoQ10 for visibly improved radiance and texture. This velvety cream rebuilds a compromised barrier with Ceramide and Glutathione, leaving skin calm, resilient, and beautifully revitalized."
                      : handle === "4gf-supreme-plumping-essence"
                        ? "Removes excess sebum and waste secreted overnight, leaving the skin clean and fresh. This complete care cleansing gel gently purifies the skin while helping maintain a clear, balanced complexion."
                        : handle === "anti-aging-line-set"
                          ? "The Anti-Aging Line Set brings together three powerhouse products, Derma Sense Cleansing Gel, ATP + NAD\u207A Synergy Velvet Cream, and 4GF Supreme Volumizing & Lifting Essence. For a complete age-defying skincare ritual. Formulated with clinically proven ingredients, each step works to deeply cleanse, restore firmness, and boost radiance."
                          : handle === "the-clinic-ectoin-barrier-restorative-cream"
                            ? "THE CLINIC Ectoin Barrier Restorative Cream is a deeply nourishing cream formulated with Ectoin, Ceramide NP, and Niacinamide to replenish moisture, reinforce the skin barrier, and deliver a silky, non-sticky finish for lasting hydration and resilience."
                              : handle === "the-clinic-ectoin-ph-balancing-gel-cleanser"
                                ? "THE CLINIC Ectoin pH-Balancing Gel Cleanser is a pH-balanced cleanser with a cushiony texture that transforms into a dense, elastic gel on the skin, gently rolling away makeup and impurities without irritation while maintaining the skin's natural oil-moisture balance and leaving it feeling fresh and hydrated."
                                : handle === "the-clinic-barrier-line"
                                  ? "The GICLÉE THE CLINIC Set brings together two expertly formulated products, the Ectoin Barrier Restorative Cream and the Ectoin pH-Balancing Gel Cleanser. Both powered by naturally derived Ectoin to cleanse, restore, and protect the skin barrier."
                                   : handle === "dolido-tea-tree-toner"
                                     ? "The DOLIDO Tea Tree Toner instantly cools skin by 2.63°C, tightens pores, and rebalances oil and moisture levels with patented mushroom and oat ferment extracts. Formulated with 12 types of hyaluronic acid and a 5-layer ceramide complex, it deeply hydrates and restores the skin barrier — suitable for all skin types including sensitive skin."
                                       : handle === "professional-care-set-set-of-10"
                                       ? "The AESTHEIN Professional Care Set (Set of 10) is an exclusive collection curated for skincare professionals, bringing together ten high-performance products covering non-invasive contouring, deep cleansing, intensive ampoules, sun protection, and barrier care for a complete professional-grade skincare ritual tailored to all skin types and concerns."
                                       : handle === "face-fit-tox-kit-7ml-3-vials"
                                         ? "is a non-invasive skin contouring beauty kit featuring three-layered ampoules (Slim Fit, Wrinkle Fit, and Volume Fit) designed to visibly improve skin firmness, reduce the appearance of wrinkles, and restore facial volume for a more sculpted, lifted complexion."
                                         : undefined
                }
                titleNode={
                  handle === "face-fit-tox-kit-7ml-3-vials" ? (
                    <>
                      Face Fit Tox KIT{" "}
                      <span className="font-normal text-muted-foreground">7ml × 3 vials</span>
                    </>
                  ) : undefined
                }
                extraBelowDescription={
                  handle === "face-fit-tox-kit-7ml-3-vials" ? (
                    <div className="mt-5 space-y-2">
                      <div className="flex items-center gap-2 text-[13px] text-foreground">
                        <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0" aria-hidden="true">
                          <circle cx="12" cy="12" r="11" fill="#fff" stroke="#0a2d6e" strokeWidth="1" />
                          <path d="M12 2a10 10 0 0 1 0 20 5 5 0 0 0 0-10 5 5 0 0 1 0-10z" fill="#0a2d6e" />
                          <path d="M12 2a10 10 0 0 0 0 20 5 5 0 0 1 0-10 5 5 0 0 0 0-10z" fill="#c8102e" />
                        </svg>
                        <span>Patent No. 10-2025-0065451 (KIPO)</span>
                      </div>
                      <p className="text-[13px] text-muted-foreground" style={{ lineHeight: 1.7 }}>
                        A professional beauty kit for non-invasive skin contouring, tailored to each individual's skin needs.
                      </p>
                    </div>
                  ) : undefined
                }
                onImageChange={(url) => setExtraFirst(url)}
                onScrollToReviews={() =>
                  reviewsRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related — "You May Be Interested" (moved up under buy box) */}
      {related.length > 0 && (
        <section className="mx-auto max-w-[1280px] px-5 pb-16 md:px-10 md:pb-20">
          <h2 className="mb-8 text-[24px] font-semibold tracking-tight md:text-[28px]">
            You May Be Interested
          </h2>
          <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
            {related.slice(0, 3).map((p) => (
              <div
                key={p.id}
                className="w-[70%] flex-shrink-0 snap-start sm:w-[45%] md:w-auto"
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}

      {handle === "the-clinic-ectoin-ph-balancing-gel-cleanser" && (
        <GicleeCleanserFeatures title={titleStr} />
      )}

      {/* Story */}
      {(() => {
        switch (product.handle) {
          case "derma-sense-cleansing-gel":
            return <DermaSenseStory title={titleStr} />;
          case "atp-nad-synergy-velvet-cream":
            return <VelvetCreamStory title={titleStr} />;
          case "4gf-supreme-plumping-essence":
            return <EssenceStory title={titleStr} />;
          case "anti-aging-line-set":
            return <AntiAgingStory title={titleStr} />;
          case "essential-home-care-set-set-of-9":
            return <HomecareSetStory title={titleStr} />;
          case "professional-care-set-set-of-10":
            return <ProSetDetail title={titleStr} />;
          case "the-clinic-ectoin-ph-balancing-gel-cleanser":
            return null;
          case "the-clinic-ectoin-barrier-restorative-cream":
            return <GicleeCreamStory title={titleStr} />;
          case "the-clinic-barrier-line":
            return <GicleeBarrierStory title={titleStr} />;
          case "dolido-tea-tree-toner":
            return <DolidoTonerStory title={titleStr} />;
          case "face-fit-tox-kit-7ml-3-vials":
            return <FaceFitToxStory title={titleStr} />;
          default:
            return <PdpStory product={product} />;
        }
      })()}

      {/* Reviews — hide on custom story PDPs */}
      {!["derma-sense-cleansing-gel", "atp-nad-synergy-velvet-cream", "4gf-supreme-plumping-essence", "anti-aging-line-set", "essential-home-care-set-set-of-9", "professional-care-set-set-of-10", "the-clinic-ectoin-ph-balancing-gel-cleanser", "the-clinic-ectoin-barrier-restorative-cream", "the-clinic-barrier-line", "dolido-tea-tree-toner", "face-fit-tox-kit-7ml-3-vials"].includes(product.handle) && (
        <div ref={reviewsRef}>
          <ReviewSection product={product} />
        </div>
      )}

      <StickyBar product={product} triggerRef={addToCartRef} />
    </div>
  );
}
