import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/account/")({
  component: AccountIndex,
  head: () => ({
    meta: [{ title: "My Account — Min Seoul" }],
  }),
});

function AccountIndex() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate({ to: "/account/dashboard", replace: true });
    else navigate({ to: "/account/login", replace: true });
  }, [user, loading, navigate]);

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-[1280px] items-center justify-center px-5 py-14 md:px-10 md:py-20">
      <p className="text-[13px] text-muted-foreground">Loading…</p>
    </section>
  );
}
