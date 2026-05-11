import { useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useProduct } from "@/hooks/useProduct";
import { products } from "@/data/mockProducts";
import { ImageGallery } from "@/components/pdp/ImageGallery";
import { ProductInfo } from "@/components/pdp/ProductInfo";
import { TabSection } from "@/components/pdp/TabSection";
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

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="font-heading text-3xl">{t("pdp.notFound")}</h1>
        <Link to="/" className="mt-4 inline-block text-accent">
          {t("pdp.backHome")}
        </Link>
      </div>
    );
  }

  const titleStr = tr(product.title);
  const galleryImages =
    extraFirst && extraFirst !== baseImages[0]?.url
      ? [{ url: extraFirst, altText: titleStr }, ...baseImages]
      : baseImages;

  const related = products
    .filter((p) => p.brandHandle === product.brandHandle && p.id !== product.id)
    .slice(0, 4);

  return (
    <div>
      {/* Breadcrumb */}
      <nav
        className="mx-auto max-w-[1280px] px-5 py-4 text-[13px] text-muted-foreground md:px-10"
        aria-label="Breadcrumb"
      >
        <Link to="/" className="hover:text-foreground">
          {t("pdp.breadcrumb.home")}
        </Link>
        <span className="mx-2 text-muted-foreground/50">{">"}</span>
        <Link
          to="/collections/$brandHandle"
          params={{ brandHandle: product.brandHandle }}
          className="hover:text-foreground"
        >
          {product.vendor}
        </Link>
        <span className="mx-2 text-muted-foreground/50">{">"}</span>
        <span className="text-foreground">{titleStr}</span>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-[1280px] px-5 pb-10 md:px-10">
        <div className="grid gap-10 md:grid-cols-[55%_45%] md:gap-12">
          <div>
            <ImageGallery images={galleryImages} />
          </div>
          <div className="md:sticky md:top-24 md:self-start">
            <div ref={addToCartRef}>
              <ProductInfo
                product={product}
                onImageChange={(url) => setExtraFirst(url)}
                onScrollToReviews={() =>
                  reviewsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <TabSection product={product} />

      {/* Reviews */}
      <div ref={reviewsRef}>
        <ReviewSection product={product} />
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-[1280px] px-5 py-20 md:px-10">
          <h2 className="mb-8 font-heading text-[28px]">{t("pdp.related")}</h2>
          <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
            {related.map((p) => (
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
