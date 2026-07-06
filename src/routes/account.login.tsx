import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { syncSignupCustomerToShopify } from "@/lib/shopify-customers.functions";
import heroImage from "@/assets/home/hero1-product.jpg";

export const Route = createFileRoute("/account/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Log in — Purève Seoul" },
      { name: "description", content: "Log in to your Purève Seoul account." },
    ],
  }),
});

function LoginPage() {
  const navigate = useNavigate();
  const syncShopifyCustomer = useServerFn(syncSignupCustomerToShopify);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      void syncShopifyCustomer({ data: {} }).catch((syncError) => {
        console.warn("Shopify customer sync failed", syncError);
      });
      navigate({ to: "/account/dashboard" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An error occurred. Please try again.";
      setError(
        msg.includes("Invalid login credentials")
          ? "Invalid email or password."
          : msg,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto grid max-w-[1280px] gap-12 px-5 py-14 md:grid-cols-2 md:gap-16 md:px-10 md:py-20">
      {/* LEFT — Form */}
      <div className="max-w-[440px]">
        <h1 className="font-heading text-[40px] leading-tight tracking-tight md:text-[48px]">
          Welcome
        </h1>
        <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
          Log in to access your account and explore our latest skincare products.
        </p>

        <form onSubmit={handleSubmit} className="mt-9 flex flex-col gap-5">
          <label className="flex flex-col gap-2">
            <span className="text-[13px] text-foreground">E-mail</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-full bg-muted px-5 text-[14px] outline-none transition-shadow focus:ring-2 focus:ring-foreground/10"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[13px] text-foreground">Password</span>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 rounded-full bg-muted px-5 text-[14px] outline-none transition-shadow focus:ring-2 focus:ring-foreground/10"
            />
          </label>

          {error && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-[12.5px] text-destructive">
              {error}
            </p>
          )}

          <div className="mt-3 flex items-center gap-6">
            <button
              type="submit"
              disabled={loading}
              className="h-11 rounded-full bg-foreground px-9 text-[12px] font-medium uppercase tracking-widest text-background transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "..." : "Log in"}
            </button>
            <p className="text-[13px] text-muted-foreground">
              New customer?{" "}
              <Link
                to="/account/register"
                className="text-foreground underline underline-offset-2"
              >
                Create My Account
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* RIGHT — Visual */}
      <div className="aspect-[4/3] w-full overflow-hidden rounded-sm bg-muted md:aspect-auto md:h-[500px]">
        <img
          src={heroImage}
          alt="Purève Seoul skincare"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
