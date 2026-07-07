import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { syncSignupCustomerToShopify } from "@/lib/shopify-customers.functions";
import heroImage from "@/assets/home/hero1-product.jpg";

export const Route = createFileRoute("/account/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Log in — Min Seoul" },
      { name: "description", content: "Log in to your Min Seoul account." },
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

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">Or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Social logins */}
        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            onClick={async () => {
              const result = await lovable.auth.signInWithOAuth("google", {
                redirect_uri: window.location.origin,
              });
              if (result.error) {
                setError(result.error.message ?? "Google sign-in failed.");
                return;
              }
              if (result.redirected) return;
              navigate({ to: "/account/dashboard" });
            }}
            className="flex h-11 w-full items-center justify-center gap-2.5 rounded-full border text-[13px] font-medium transition-colors hover:bg-muted"
          >
            <svg width="16" height="16" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.167 6.656 3.58 9 3.58z"/>
            </svg>
            Continue with Google
          </button>
          <button
            type="button"
            onClick={async () => {
              const result = await lovable.auth.signInWithOAuth("apple", {
                redirect_uri: window.location.origin,
              });
              if (result.error) {
                setError(result.error.message ?? "Apple sign-in failed.");
                return;
              }
              if (result.redirected) return;
              navigate({ to: "/account/dashboard" });
            }}
            className="flex h-11 w-full items-center justify-center gap-2.5 rounded-full bg-black text-[13px] font-medium text-white transition-opacity hover:opacity-90"
          >
            <svg width="16" height="16" viewBox="0 0 384 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
            </svg>
            Continue with Apple
          </button>
        </div>
      </div>

      {/* RIGHT — Visual */}
      <div className="aspect-[4/3] w-full overflow-hidden rounded-sm bg-muted md:aspect-auto md:h-[500px]">
        <img
          src={heroImage}
          alt="Min Seoul skincare"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
