import { createFileRoute } from "@tanstack/react-router";
import CartPage from "@/pages/CartPage";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({
    meta: [
      { title: "Your Cart — Min Seoul" },
      { name: "description", content: "Review your Min Seoul cart and proceed to secure checkout." },
      { name: "robots", content: "noindex" },
    ],
  }),
});
