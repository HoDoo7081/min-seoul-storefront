import { Link } from "@tanstack/react-router";
import { useProduct } from "@/hooks/useProduct";
import { ImageGallery } from "@/components/pdp/ImageGallery";
import { ProductInfo } from "@/components/pdp/ProductInfo";
import { TabSection } from "@/components/pdp/TabSection";
import { ReviewSection } from "@/components/pdp/ReviewSection";

export default function ProductDetailPage({ handle }: { handle: string }) {
  const product = useProduct(handle);
  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="font-heading text-3xl">Product not found</h1>
        <Link to="/" className="mt-4 inline-block text-accent">Back to home</Link>
      </div>
    );
  }
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 pt-10">
        <p className="text-xs text-muted-foreground">
          <Link to="/">Home</Link> / <Link to="/collections/$brandHandle" params={{ brandHandle: product.brandHandle }}>{product.brandName}</Link> / {product.title}
        </p>
      </div>
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-10 md:grid-cols-2">
        <ImageGallery images={product.images} alt={product.title} />
        <ProductInfo product={product} />
      </section>
      <TabSection product={product} />
      <ReviewSection product={product} />
    </>
  );
}
