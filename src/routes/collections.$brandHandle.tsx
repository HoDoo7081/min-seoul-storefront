import { createFileRoute } from "@tanstack/react-router";
import CollectionPage from "@/pages/CollectionPage";

export const Route = createFileRoute("/collections/$brandHandle")({
  component: RouteCmp,
});

function RouteCmp() {
  const { brandHandle } = Route.useParams();
  return <CollectionPage brandHandle={brandHandle} />;
}
