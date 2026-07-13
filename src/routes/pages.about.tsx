import { createFileRoute } from "@tanstack/react-router";
import AboutPage from "@/pages/AboutPage";

export const Route = createFileRoute("/pages/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Min Seoul" },
      { name: "description", content: "Min Seoul brings together AESTHEIN, GICLÉE, and the mu:te — Korean skincare houses built on clinical wisdom, not trends." },
      { property: "og:title", content: "About — Min Seoul" },
      { property: "og:description", content: "Curated K-Beauty from three houses: AESTHEIN, GICLÉE, the mu:te." },
      { property: "og:type", content: "website" },
    ],
  }),
});
