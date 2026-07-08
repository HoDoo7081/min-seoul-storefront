import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pages/business")({
  head: () => ({
    meta: [
      { title: "Business Information — Min Seoul" },
      { name: "description", content: "Business operator information for Min Seoul." },
    ],
  }),
  component: BusinessPage,
});

const INFO_ROWS: [string, string | React.ReactNode][] = [
  ["Company Name", "Insight Networks Co., Ltd. (주식회사 인사이트네트웍스)"],
  ["Representative", "Yoon Seo-young (윤서영)"],
  ["Business Registration No.", "533-87-02396"],
  ["Corporate Registration No.", "110111-8210992"],
  ["Established", "March 1, 2022"],
  ["Address", "Rm 2539, 2F, 19 Hakdong-ro 2-gil, Gangnam-gu, Seoul, Republic of Korea (Nonhyeon-dong, Sail Building)"],
  ["Customer Support", (
    <a href="mailto:insightnetworks@koreabridging.com" className="underline hover:text-foreground">
      insightnetworks@koreabridging.com
    </a>
  )],
  ["Support Hours", "Weekdays 10:00 – 18:00 KST"],
  ["E-commerce Platform", "Shopify (txkvi0-1n.myshopify.com)"],
  ["Hosting", "Lovable / Vercel"],
];

function BusinessPage() {
  return (
    <div className="mx-auto max-w-[860px] px-5 py-16 md:px-10 md:py-24">
      <h1 className="font-heading text-[32px] tracking-tight text-foreground md:text-[40px]">
        Business Information
      </h1>
      <p className="mt-2 text-[13px] text-muted-foreground">
        Operator disclosure as required under Korean e-commerce law
      </p>

      <div className="mt-10 overflow-hidden rounded-xl border border-border/60">
        <table className="w-full text-left text-[14px]">
          <tbody>
            {INFO_ROWS.map(([label, value]) => (
              <tr key={label} className="border-b border-border/40 last:border-0">
                <td className="w-[220px] bg-muted/30 px-5 py-4 font-medium text-foreground/70 align-top">
                  {label}
                </td>
                <td className="px-5 py-4 text-foreground/80">
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-8 text-[13px] leading-[1.7] text-muted-foreground">
        This page is provided in compliance with Article 10 of the Act on Consumer Protection in Electronic Commerce (전자상거래 등에서의 소비자보호에 관한 법률). Min Seoul is operated by Insight Networks Co., Ltd. and is not affiliated with any government entity.
      </p>
    </div>
  );
}
