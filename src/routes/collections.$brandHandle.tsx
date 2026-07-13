import { createFileRoute } from "@tanstack/react-router";
import CollectionPage from "@/pages/CollectionPage";

const BRAND_META: Record<string, { title: string; description: string }> = {
  all: {
    title: "All Products — Min Seoul",
    description: "Shop every Min Seoul product across AESTHEIN, GICLÉE, and the mu:te.",
  },
  aesthein: {
    title: "AESTHEIN — Min Seoul",
    description: "AESTHEIN skincare from 100 Korean aesthetic practitioners. Gentle, safe, fundamental skin improvement.",
  },
  giclee: {
    title: "GICLÉE — Min Seoul",
    description: "GICLÉE regeneration-focused cosmeceuticals with Ectoin, developed by dermatologists.",
  },
  "the-mute": {
    title: "the mu:te — Min Seoul",
    description: "the mu:te Korean dermo-cosmetics for barrier repair and sebum balance.",
  },
};

export const Route = createFileRoute("/collections/$brandHandle")({
  component: RouteCmp,
  head: ({ params }) => {
    const meta = BRAND_META[params.brandHandle] ?? {
      title: `${params.brandHandle} — Min Seoul`,
      description: "Shop curated Korean skincare at Min Seoul.",
    };
    return {
      meta: [
        { title: meta.title },
        { name: "description", content: meta.description },
        { property: "og:title", content: meta.title },
        { property: "og:description", content: meta.description },
        { property: "og:type", content: "website" },
      ],
    };
  },
});

function RouteCmp() {
  const { brandHandle } = Route.useParams();
  return <CollectionPage brandHandle={brandHandle} />;
}
