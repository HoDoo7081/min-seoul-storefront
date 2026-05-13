import { useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useProduct } from "@/hooks/useProduct";
import { useProducts } from "@/hooks/useProducts";
import { ImageGallery } from "@/components/pdp/ImageGallery";
import cleansingGel1 from "@/assets/products/cleansing-gel-1.png";
import cleansingGel2 from "@/assets/products/cleansing-gel-2.png";
import cleansingGel3 from "@/assets/products/cleansing-gel-3.png";
import cleansingGel4 from "@/assets/products/cleansing-gel-4.png";

const CUSTOM_GALLERIES: Record<string, string[]> = {
  "derma-sense-cleansing-gel": [cleansingGel1, cleansingGel2, cleansingGel3, cleansingGel4],
};
import { ProductInfo } from "@/components/pdp/ProductInfo";
import { PdpStory } from "@/components/pdp/PdpStory";
import { DermaSenseStory } from "@/components/pdp/DermaSenseStory";
import { ReviewSection } from "@/components/pdp/ReviewSection";
import { ProductCard } from "@/components/common/ProductCard";
import { useLocale } from "@/hooks/useLocale";
import { StickyBar } from "@/components/pdp/StickyBar";

export default function ProductDetailPage({ handle }: { handle: string }) {
  const product = useProduct(handle);
  const { t, tr } = useLocale();
  const reviewsRef = useRef<HTMLDivElement | null>(null);
  const addToCartRef = useRef<HTMLDivElement | null>(null);

  const baseImages = useMemo(() => product?.images ?? [], [product]);
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

      {/* Story */}
      {product.handle === "derma-sense-cleansing-gel" ? (
        <DermaSenseStory title={titleStr} />
      ) : (
        <PdpStory product={product} />
      )}

      {/* Reviews */}
      <div ref={reviewsRef}>
        <ReviewSection product={product} />
      </div>

      {/* Related — "You May Be Interested" */}
      {related.length > 0 && (
        <section className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-20">
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

      <StickyBar product={product} triggerRef={addToCartRef} />
    </div>
  );
}
