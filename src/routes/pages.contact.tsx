import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pages/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Selvé" },
      { name: "description", content: "Get in touch with Selvé." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto max-w-[860px] px-5 py-20 md:px-10 md:py-28">
      <p className="flex items-center gap-2 text-[12px]">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#7aa6d6]" />
        Contact
      </p>
      <h1 className="mt-6 font-heading text-[32px] leading-tight md:text-[44px]">
        Talk to us.
      </h1>
      <p className="mt-4 max-w-[560px] text-[14px] leading-[1.7] text-muted-foreground">
        For wholesale, press, or general inquiries, reach our team directly.
      </p>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Email</p>
          <a href="mailto:hello@selve.com" className="mt-2 block text-[16px]">
            hello@selve.com
          </a>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Studio</p>
          <p className="mt-2 text-[16px]">Seoul, Republic of Korea</p>
        </div>
      </div>
    </div>
  );
}
