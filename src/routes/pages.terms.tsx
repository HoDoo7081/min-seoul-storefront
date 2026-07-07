import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pages/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Min Seoul" },
      { name: "description", content: "Terms and conditions for using Min Seoul." },
    ],
  }),
  component: TermsPage,
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

function TermsPage() {
  return (
    <div className="mx-auto max-w-[860px] px-5 py-16 md:px-10 md:py-24">
      <h1 className="font-heading text-[32px] tracking-tight text-foreground md:text-[40px]">
        Terms & Conditions
      </h1>
      <p className="mt-2 text-[13px] text-muted-foreground">Last updated: May 2026</p>

      <div className="mt-10">
        <Section num="1" title="General">
          <p>
            These Terms & Conditions govern your use of purveseoul.com (the "Site") operated by Korea Bridging Group Co., Ltd. ("we", "us", or "our"). By accessing or placing an order on our Site, you agree to be bound by these terms.
          </p>
        </Section>

        <Section num="2" title="Products & Pricing">
          <p>
            All prices are listed in USD. We reserve the right to modify prices at any time without prior notice. Product availability is subject to change. We do our best to display accurate product colors and descriptions, but we cannot guarantee that your device's display will reflect exact colors.
          </p>
        </Section>

        <Section num="3" title="Orders & Payment">
          <p>
            By placing an order, you represent that you are at least 18 years of age. We accept payment via PayPal and major credit/debit cards. Orders are confirmed once payment is successfully processed. We reserve the right to cancel any order due to pricing errors, suspected fraud, or stock unavailability.
          </p>
        </Section>

        <Section num="4" title="Shipping">
          <p>
            We ship internationally from South Korea. Standard delivery takes up to <strong>7 business days</strong> from dispatch. Shipping fees are calculated at checkout. Customers are responsible for any customs duties, taxes, or import fees imposed by their country.
          </p>
        </Section>

        <Section num="5" title="Returns & Refunds">
          <p>
            We accept returns of unopened, unused products within 30 days of delivery. To initiate a return, contact us at{" "}
            <a href="mailto:contact@koreabridging.com" className="underline hover:text-foreground">
              contact@koreabridging.com
            </a>
            .
          </p>
          <p>
            <strong>Return shipping is the customer's responsibility.</strong> A return shipping fee of <strong>KRW 20,000 (approx. TWD 426)</strong> will be borne by the customer, unless the item is defective or incorrectly sent. Refunds are processed within 5–10 business days after we receive the returned item.
          </p>
        </Section>

        <Section num="6" title="Intellectual Property">
          <p>
            All content on this Site, including images, text, logos, and brand assets, is the property of Min Seoul or its brand partners (Aesthein, Giclée, Dolido). Unauthorized use, reproduction, or distribution is strictly prohibited.
          </p>
        </Section>

        <Section num="7" title="Limitation of Liability">
          <p>
            To the fullest extent permitted by law, Min Seoul shall not be liable for any indirect, incidental, or consequential damages arising from your use of our Site or products. Our total liability shall not exceed the amount paid for the relevant order.
          </p>
        </Section>

        <Section num="8" title="Governing Law">
          <p>
            These terms are governed by the laws of the Republic of Korea. Any disputes shall be subject to the exclusive jurisdiction of the courts of Seoul, South Korea.
          </p>
        </Section>

        <Section num="9" title="Contact">
          <p>
            For questions regarding these terms, contact us at{" "}
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
