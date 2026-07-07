import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pages/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Min Seoul" },
      { name: "description", content: "Privacy policy for Min Seoul customers." },
    ],
  }),
  component: PrivacyPage,
});

function Section({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-border/40 py-8 last:border-0 md:py-10">
      <h2 className="mb-4 text-[15px] font-medium text-foreground">
        {num}. {title}
      </h2>
      <div className="space-y-3 text-[14px] leading-[1.7] text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[860px] px-5 py-16 md:px-10 md:py-24">
      <h1 className="font-heading text-[32px] tracking-tight text-foreground md:text-[40px]">
        Privacy Policy
      </h1>
      <p className="mt-2 text-[13px] text-muted-foreground">Last updated: May 2026</p>

      <div className="mt-10">
        <Section num="1" title="Information We Collect">
          <p>We collect information you provide directly, including:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Name, email address, and password (for account creation)</li>
            <li>Shipping address and contact details (for order fulfillment)</li>
            <li>Payment information (processed securely via Shopify/PayPal — we do not store card details)</li>
            <li>Browsing behavior and preferences on our Site (via cookies)</li>
          </ul>
        </Section>

        <Section num="2" title="How We Use Your Information">
          <ul className="list-disc space-y-1 pl-5">
            <li>To process and fulfill your orders</li>
            <li>To send order confirmations and shipping updates</li>
            <li>To improve our Site and personalize your experience</li>
            <li>To send marketing emails (only with your consent)</li>
            <li>To comply with legal obligations</li>
          </ul>
        </Section>

        <Section num="3" title="Sharing of Information">
          <p>
            We do not sell your personal information. We share data only with trusted third parties necessary to operate our business:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Shopify — e-commerce platform and payment processing</li>
            <li>PayPal — payment gateway</li>
            <li>Supabase — authentication and account management</li>
            <li>Shipping carriers — for order delivery</li>
          </ul>
        </Section>

        <Section num="4" title="Cookies">
          <p>
            We use cookies to maintain your session, remember your language/currency preferences, and analyze Site traffic. You may disable cookies in your browser settings, but some features may not function properly.
          </p>
        </Section>

        <Section num="5" title="Data Retention">
          <p>
            We retain your personal data for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. You may request deletion of your account at any time by contacting us.
          </p>
        </Section>

        <Section num="6" title="Your Rights">
          <p>
            Depending on your location, you may have the right to access, correct, or delete your personal data. To exercise these rights, contact us at{" "}
            <a href="mailto:contact@koreabridging.com" className="underline hover:text-foreground">
              contact@koreabridging.com
            </a>
            .
          </p>
        </Section>

        <Section num="7" title="Security">
          <p>
            We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </Section>

        <Section num="8" title="Contact">
          <p>
            For privacy-related inquiries, contact us at{" "}
            <a href="mailto:contact@koreabridging.com" className="underline hover:text-foreground">
              contact@koreabridging.com
            </a>
            .
          </p>
        </Section>
      </div>
    </div>
  );
}
