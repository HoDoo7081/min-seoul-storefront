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
import antiAgingCard from "@/assets/products/anti-aging-card.jpg";
import antiAgingCard2 from "@/assets/products/anti-aging-card-2.jpg";

const CUSTOM_GALLERIES: Record<string, string[]> = {
  "derma-sense-cleansing-gel": [cleansingGel1, cleansingGel2, cleansingGel3, cleansingGel4],
  "atp-nad-synergy-velvet-cream": [velvetCreamMain, velvetCream1, velvetCreamCard, velvetCreamCard2],
  "4gf-supreme-plumping-essence": [essenceCard, essenceCard2],
  "anti-aging-line-set": [antiAgingCard, antiAgingCard2],
};
import { ProductInfo } from "@/components/pdp/ProductInfo";
import { PdpStory } from "@/components/pdp/PdpStory";
import { DermaSenseStory } from "@/components/pdp/DermaSenseStory";
import { VelvetCreamStory } from "@/components/pdp/VelvetCreamStory";
import { EssenceStory } from "@/components/pdp/EssenceStory";
import { AntiAgingStory } from "@/components/pdp/AntiAgingStory";
import { ReviewSection } from "@/components/pdp/ReviewSection";
import { ProductCard } from "@/components/common/ProductCard";
import { useLocale } from "@/hooks/useLocale";
import { StickyBar } from "@/components/pdp/StickyBar";

export default function ProductDetailPage({ handle }: { handle: string }) {
  const product = useProduct(handle);
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

  if (!product) {
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

  const titleStr = tr(product.title);
  const galleryImages =
    extraFirst && extraFirst !== baseImages[0]?.url
      ? [{ url: extraFirst, altText: titleStr }, ...baseImages]
      : baseImages;

  const related = allProducts
    .filter((p) => p.brandHandle === product.brandHandle && p.id !== product.id)
    .slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-[1280px] px-5 pt-8 pb-12 md:px-10 md:pt-12 md:pb-16">
        <div className="grid gap-8 md:grid-cols-[1fr_360px] md:gap-12 lg:grid-cols-[1fr_400px]">
          <div>
            <ImageGallery images={galleryImages} />
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
          default:
            return <PdpStory product={product} />;
        }
      })()}

      {/* Reviews — hide on custom story PDPs */}
      {!["derma-sense-cleansing-gel", "atp-nad-synergy-velvet-cream", "4gf-supreme-plumping-essence", "anti-aging-line-set"].includes(product.handle) && (
        <div ref={reviewsRef}>
          <ReviewSection product={product} />
        </div>
      )}

      <StickyBar product={product} triggerRef={addToCartRef} />
    </div>
  );
}
