import { createFileRoute } from "@tanstack/react-router";
import ProductDetailPage from "@/pages/ProductDetailPage";

export const Route = createFileRoute("/products/$handle")({
  component: RouteCmp,
});

function RouteCmp() {
  const { handle } = Route.useParams();
  return <ProductDetailPage handle={handle} />;
}
