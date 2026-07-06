import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { X, Eye, EyeOff, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { syncSignupCustomerToShopify } from "@/lib/shopify-customers.functions";

type Mode = "login" | "signup" | "reset";

export function AuthModal({ onClose }: { onClose: () => void }) {
  const syncShopifyCustomer = useServerFn(syncSignupCustomerToShopify);
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetMsg = () => {
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    resetMsg();

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        void syncShopifyCustomer({ data: {} }).catch((syncError) => {
          console.warn("Shopify customer sync failed", syncError);
        });
        onClose();
      } else if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
            emailRedirectTo: `${window.location.origin}/account/login?verified=1`,
          },
        });
        if (error) throw error;
        setSuccess("Account created! Please check your email.");
      } else if (mode === "reset") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/account/reset`,
        });
        if (error) throw error;
        setSuccess("Password reset email sent.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An error occurred.";
      setError(
        msg.includes("Invalid login credentials")
          ? "Invalid email or password."
          : msg.includes("User already registered")
            ? "This email is already registered."
            : msg.includes("Password should be")
              ? "Password must be at least 6 characters."
              : msg,
      );
    } finally {
      setLoading(false);
    }
  };

  const titles: Record<Mode, string> = {
    login: "Sign In",
    signup: "Create Account",
    reset: "Reset Password",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 animate-fade-in"
        onClick={onClose}
      />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-[420px] mx-4 rounded-[12px] bg-background p-7 shadow-xl animate-fade-in"
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X size={18} />
        </button>

        {/* Title */}
        <h2 className="font-heading text-[22px] tracking-tight">{titles[mode]}</h2>
        <p className="mt-1.5 text-[13px] text-muted-foreground">
          {mode === "login" && "Sign in to your Purève Seoul account."}
          {mode === "signup" && "Create your account and discover K-Beauty."}
          {mode === "reset" && "Enter your email and we'll send you a reset link."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3.5">
          {/* Name (signup only) */}
          {mode === "signup" && (
            <label className="flex flex-col gap-1.5">
              <span className="text-[12px] font-medium uppercase tracking-widest">Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Jane Smith"
                className="rounded-lg border px-4 py-2.5 text-[14px] outline-none transition-colors focus:border-foreground"
              />
            </label>
          )}

          {/* Email */}
          <label className="flex flex-col gap-1.5">
            <span className="text-[12px] font-medium uppercase tracking-widest">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="hello@example.com"
              className="rounded-lg border px-4 py-2.5 text-[14px] outline-none transition-colors focus:border-foreground"
            />
          </label>

          {/* Password (except reset) */}
          {mode !== "reset" && (
            <label className="flex flex-col gap-1.5">
              <span className="text-[12px] font-medium uppercase tracking-widest">Password</span>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder="At least 6 characters"
                  className="w-full rounded-lg border px-4 py-2.5 pr-10 text-[14px] outline-none transition-colors focus:border-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </label>
          )}

          {/* Error / Success messages */}
          {error && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-[12.5px] text-destructive">
              {error}
            </p>
          )}
          {success && (
            <p className="rounded-md bg-muted px-3 py-2 text-[12.5px] text-foreground">
              {success}
            </p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-1 flex h-11 items-center justify-center rounded-lg bg-foreground text-[13px] font-medium uppercase tracking-widest text-background transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : titles[mode]}
          </button>
        </form>

        {/* Social login divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">OR</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Google social login */}
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
            onClose();
          }}
          className="flex h-11 w-full items-center justify-center gap-2.5 rounded-lg border text-[13px] font-medium transition-colors hover:bg-muted"
        >
          <svg width="16" height="16" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
            <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.167 6.656 3.58 9 3.58z"/>
          </svg>
          Continue with Google
        </button>

        {/* Apple social login */}
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
            onClose();
          }}
          className="mt-2.5 flex h-11 w-full items-center justify-center gap-2.5 rounded-lg bg-black text-[13px] font-medium text-white transition-opacity hover:opacity-90"
        >
          <svg width="16" height="16" viewBox="0 0 384 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
          </svg>
          Continue with Apple
        </button>

        {/* Bottom mode switch */}
        <p className="mt-6 text-center text-[12.5px] text-muted-foreground">
          {mode === "login" && (
            <>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => { setMode("signup"); resetMsg(); }}
                className="font-medium text-foreground underline-offset-2 hover:underline"
              >
                Create Account
              </button>
              {" · "}
              <button
                type="button"
                onClick={() => { setMode("reset"); resetMsg(); }}
                className="font-medium text-foreground underline-offset-2 hover:underline"
              >
                Reset Password
              </button>
            </>
          )}
          {mode === "signup" && (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => { setMode("login"); resetMsg(); }}
                className="font-medium text-foreground underline-offset-2 hover:underline"
              >
                Sign In
              </button>
            </>
          )}
          {mode === "reset" && (
            <button
              type="button"
              onClick={() => { setMode("login"); resetMsg(); }}
              className="font-medium text-foreground underline-offset-2 hover:underline"
            >
              Back to Sign In
            </button>
          )}
        </p>
      </div>
    </div>
  );
}
