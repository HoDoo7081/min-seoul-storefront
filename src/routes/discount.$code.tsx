import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/discount/$code")({
  beforeLoad: ({ params }) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("utm_discount", params.code);
      sessionStorage.setItem("utm_source", params.code);
    }
    throw redirect({ to: "/" });
  },
});
