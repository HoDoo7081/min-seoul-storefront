import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import contactProducts from "@/assets/contact-products.jpg";

export const Route = createFileRoute("/pages/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Selvé" },
      { name: "description", content: "Get in touch with Selvé via email or Instagram." },
    ],
  }),
  component: ContactPage,
});

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your inputs.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      message: parsed.data.message,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Failed to send. Please try again.");
      return;
    }
    toast.success("Thank you! We'll get back to you soon.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 py-16 md:grid-cols-2 md:gap-16 md:px-10 md:py-20">
      {/* LEFT — Form */}
      <div>
        <h1 className="font-heading text-[40px] font-semibold leading-[1.1] tracking-tight md:text-[56px]">
          Contact Form
        </h1>
        <p className="mt-4 text-[15px] text-foreground/80">
          Feel free to connect with us via email or Instagram channel.
        </p>

        <form onSubmit={onSubmit} className="mt-12 space-y-6" noValidate>
          <Field label="Name">
            <input
              type="text"
              value={form.name}
              onChange={onChange("name")}
              maxLength={100}
              required
              className="h-12 w-full rounded-full bg-muted px-5 text-[14px] outline-none focus:ring-2 focus:ring-ring/40"
            />
          </Field>

          <Field label="E-mail">
            <input
              type="email"
              value={form.email}
              onChange={onChange("email")}
              maxLength={255}
              required
              className="h-12 w-full rounded-full bg-muted px-5 text-[14px] outline-none focus:ring-2 focus:ring-ring/40"
            />
          </Field>

          <Field label="Phone Number">
            <input
              type="tel"
              value={form.phone}
              onChange={onChange("phone")}
              maxLength={50}
              className="h-12 w-full rounded-full bg-muted px-5 text-[14px] outline-none focus:ring-2 focus:ring-ring/40"
            />
          </Field>

          <Field label="Message">
            <textarea
              value={form.message}
              onChange={onChange("message")}
              maxLength={2000}
              required
              rows={6}
              className="w-full resize-none rounded-[24px] bg-muted px-5 py-4 text-[14px] outline-none focus:ring-2 focus:ring-ring/40"
            />
          </Field>

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-[14px] font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? "Sending..." : "Send"}
            </button>
          </div>

          <p className="pt-6 text-[13px] text-muted-foreground">
            By clicking the button you agree to the Privacy Policy.
          </p>
        </form>
      </div>

      {/* RIGHT — Image */}
      <div className="relative">
        <div className="sticky top-24 overflow-hidden rounded-[8px] bg-[#eef0f3]">
          <img
            src={contactProducts}
            alt="Selvé product range"
            loading="lazy"
            className="h-full w-full object-contain"
            style={{ aspectRatio: "4/5" }}
          />
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[14px] text-foreground">{label}</span>
      {children}
    </label>
  );
}
