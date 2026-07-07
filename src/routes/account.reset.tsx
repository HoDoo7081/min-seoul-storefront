import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/account/reset")({
  component: ResetPasswordPage,
  head: () => ({
    meta: [
      { title: "Reset Password — Min Seoul" },
      { name: "description", content: "Set a new Min Seoul account password." },
    ],
  }),
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;
      setSuccess("Password updated. You can now log in.");
      window.setTimeout(() => navigate({ to: "/account/login" }), 1200);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Please open the reset link again.";
      setError(msg.includes("Password should be") ? "Password must be at least 6 characters." : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto flex min-h-[62vh] max-w-[520px] flex-col justify-center px-5 py-16 md:px-10">
      <h1 className="font-heading text-[38px] leading-tight tracking-tight md:text-[46px]">
        Reset Password
      </h1>
      <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
        Enter a new password for your Min Seoul account.
      </p>

      <form onSubmit={handleSubmit} className="mt-9 flex flex-col gap-5">
        <label className="flex flex-col gap-2">
          <span className="text-[13px] text-foreground">New Password</span>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 rounded-full bg-muted px-5 text-[14px] outline-none transition-shadow focus:ring-2 focus:ring-foreground/10"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[13px] text-foreground">Confirm Password</span>
          <input
            type="password"
            required
            minLength={6}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-11 rounded-full bg-muted px-5 text-[14px] outline-none transition-shadow focus:ring-2 focus:ring-foreground/10"
          />
        </label>

        {error && <p className="rounded-md bg-destructive/10 px-3 py-2 text-[12.5px] text-destructive">{error}</p>}
        {success && <p className="rounded-md bg-muted px-3 py-2 text-[12.5px] text-foreground">{success}</p>}

        <div className="mt-3 flex items-center gap-6">
          <button
            type="submit"
            disabled={loading}
            className="h-11 rounded-full bg-foreground px-9 text-[12px] font-medium uppercase tracking-widest text-background transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "..." : "Update Password"}
          </button>
          <Link to="/account/login" className="text-[13px] text-foreground underline underline-offset-2">
            Back to login
          </Link>
        </div>
      </form>
    </section>
  );
}