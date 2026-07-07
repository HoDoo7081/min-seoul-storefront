import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/home/hero2-product.jpg";

export const Route = createFileRoute("/account/register")({
  component: RegisterPage,
  head: () => ({
    meta: [
      { title: "Create Account — Min Seoul" },
      { name: "description", content: "Create your Min Seoul account." },
    ],
  }),
});

function RegisterPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!agree) {
      setError("Please agree to the Terms of Use.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: `${firstName} ${lastName}`.trim() },
          emailRedirectTo: `${window.location.origin}/account/login?verified=1`,
        },
      });
      if (error) throw error;
      setSuccess("Account created! Please check your email to confirm.");
      setTimeout(() => navigate({ to: "/account/login" }), 1500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An error occurred. Please try again.";
      setError(
        msg.includes("User already registered")
          ? "An account with this email already exists."
          : msg.includes("Password should be")
            ? "Password must be at least 6 characters."
            : msg,
      );
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "h-11 rounded-full bg-muted px-5 text-[14px] outline-none transition-shadow focus:ring-2 focus:ring-foreground/10";

  return (
    <section className="mx-auto grid max-w-[1280px] gap-12 px-5 py-14 md:grid-cols-2 md:gap-16 md:px-10 md:py-20">
      {/* LEFT — Form */}
      <div className="max-w-[440px]">
        <h1 className="font-heading text-[40px] leading-tight tracking-tight md:text-[48px]">
          Create Account
        </h1>
        <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
          Create an account to enjoy a personalized shopping experience, track
          orders, and access exclusive offers.
        </p>

        <form onSubmit={handleSubmit} className="mt-9 flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-2">
              <span className="text-[13px]">First Name</span>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={inputCls}
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[13px]">Last Name</span>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={inputCls}
              />
            </label>
          </div>

          <label className="flex flex-col gap-2">
            <span className="text-[13px]">E-mail</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputCls}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[13px]">Password</span>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputCls}
            />
          </label>

          <label className="mt-2 flex items-center gap-3 text-[13px]">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="h-4 w-4 rounded-full border-muted-foreground accent-foreground"
            />
            <span className="text-muted-foreground">
              I have read and are agreeing to our{" "}
              <span className="text-foreground">Terms of Use</span>{" "}
              <span className="text-destructive">*</span>
            </span>
          </label>

          {error && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-[12.5px] text-destructive">
              {error}
            </p>
          )}
          {success && (
            <p className="rounded-md bg-muted px-3 py-2 text-[12.5px]">{success}</p>
          )}

          <div className="mt-3 flex items-center gap-6">
            <button
              type="submit"
              disabled={loading}
              className="h-11 rounded-full bg-foreground px-7 text-[12px] font-medium uppercase tracking-widest text-background transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "..." : "Create My Account"}
            </button>
            <p className="text-[13px] text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/account/login"
                className="text-foreground underline underline-offset-2"
              >
                Log In &gt;
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* RIGHT — Visual */}
      <div className="aspect-[4/3] w-full overflow-hidden rounded-sm bg-muted md:aspect-auto md:h-[560px]">
        <img
          src={heroImage}
          alt="Min Seoul skincare"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
