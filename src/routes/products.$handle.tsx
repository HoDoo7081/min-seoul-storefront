import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import ProductDetailPage from "@/pages/ProductDetailPage";
import { getProductByHandle } from "@/lib/shopify.functions";

export const Route = createFileRoute("/products/$handle")({
  component: RouteCmp,
  loader: async ({ params }) => {
    const product = await getProductByHandle({ data: { handle: params.handle } });
    return { product };
  },
  head: ({ loaderData }) => {
    const product = loaderData?.product;
    const title = product?.title
      ? `${typeof product.title === "string" ? product.title : product.title.en ?? ""} — Min Seoul`
      : "Product — Min Seoul";
    const description = product?.shortDescription
      ? (typeof product.shortDescription === "string" ? product.shortDescription : product.shortDescription.en ?? "")
      : "Discover premium K-Beauty at Min Seoul.";
    const image = product?.images?.[0]?.url ?? "";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: image },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
      ],
    };
  },
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="mx-auto max-w-[720px] px-5 py-20 text-center">
        <h1 className="text-[20px] font-semibold">Product page unavailable</h1>
        <p className="mt-2 text-[13px] text-muted-foreground">
          {error?.message ?? "Unknown error"}
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-md bg-foreground px-4 py-2 text-[13px] text-background"
          >
            Try Again
          </button>
          <Link
            to="/collections/$brandHandle"
            params={{ brandHandle: "all" }}
            className="rounded-md border border-border px-4 py-2 text-[13px]"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-[720px] px-5 py-20 text-center">
      <h1 className="text-[20px] font-semibold">Product not found</h1>
      <Link
        to="/collections/$brandHandle"
        params={{ brandHandle: "all" }}
        className="mt-6 inline-block rounded-md border border-border px-4 py-2 text-[13px]"
      >
        View All Products
      </Link>
    </div>
  ),
});

function RouteCmp() {
  const { handle } = Route.useParams();
  const { product } = Route.useLoaderData();
  return <ProductDetailPage handle={handle} initialProduct={product ?? undefined} />;
}
