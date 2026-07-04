import { Link } from "@tanstack/react-router";
import { brands } from "@/data/mockBrands";
import { useLocale } from "@/hooks/useLocale";
import aestheinImg from "@/assets/about/aesthein.png";
import gicleeImg from "@/assets/about/giclee.png";
import muteImg from "@/assets/about/the-mute.png";

const BRAND_BLOCKS = [
  {
    handle: "aesthein",
    name: "AESTHEIN",
    image: aestheinImg,
    overlayLight: true,
    body: `AESTHEIN was born from the collective clinical wisdom of 100 Korean aesthetic practitioners — professionals who work with real skin, real concerns, and real results every day. Rather than following trends or chasing bold marketing claims, AESTHEIN focuses on one thing: fundamental skin improvement that lasts.\n\nEvery formula is built on the principles of healthy skin structure, using only ingredients that are safe for all skin types — including pregnant women, sensitive skin, and problem-prone skin. The same product works differently on every person, because AESTHEIN is designed to respond to what each individual skin truly needs.`,
  },
  {
    handle: "giclee",
    name: "GICLÉE",
    image: gicleeImg,
    overlayLight: true,
    body: `GICLÉE is a regeneration-focused cosmeceutical brand developed by dermatologists. Named after the fine art printing technique known for its precision and depth, GICLÉE applies that same meticulous philosophy to skincare — formulating science-backed solutions that restore, repair, and reveal healthier skin.\n\nCentral to the line is Ectoin, a naturally-derived cellular protectant extracted from extremophile bacteria, known for its exceptional ability to shield skin from UV exposure, heat, and environmental stressors.`,
  },
  {
    handle: "the-mute",
    name: "the mu:te",
    image: muteImg,
    overlayLight: false,
    body: `the mu:te is a Korean dermo-cosmetic skincare brand built on a single belief — that compromised skin needs gentle care, not aggressive solutions. Rather than relying on high-concentration or harsh formulas, the mu:te focuses on barrier repair, thermal calming, and sebum balance to help skin return to its natural, stable state.\n\nWith a philosophy rooted in long-term skin resilience, every product is designed to quietly restore what sensitive skin needs most.`,
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-[12px] text-foreground">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#7aa6d6]" />
      {children}
    </p>
  );
}

function SeeProductsBtn({ handle }: { handle: string }) {
  return (
    <Link
      to="/collections/$brandHandle"
      params={{ brandHandle: handle }}
      className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-[12px] font-medium text-background transition-opacity hover:opacity-90"
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-background" />
      See Products
    </Link>
  );
}

export default function AboutPage() {
  const { t, tt } = useLocale();
  void brands;
  void t;

  return (
    <div className="bg-background">
      {/* Mission */}
      <section className="mx-auto max-w-[1200px] px-5 pt-16 pb-12 md:px-10 md:pt-24 md:pb-16">
        <Eyebrow>{t("nav.about") || "About"}</Eyebrow>
        <p className="mt-6 max-w-[820px] text-[22px] leading-[1.45] tracking-tight text-foreground md:text-[28px]">
          {tt("At Purève Seoul, we believe great skin isn't about following trends. It's about understanding how skin actually works — and choosing products that respect that.")}
        </p>
      </section>

      {/* Brands */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-[1200px] px-5 md:px-10">
          <Eyebrow>{tt("Brands")}</Eyebrow>
        </div>

        <div className="mt-8">
          {BRAND_BLOCKS.map((b, i) => {
            const imageFirst = i % 2 === 0;
            const ImageBlock = (
              <div className="relative aspect-square overflow-hidden bg-[#f4f6f9]">
                <img
                  src={b.image}
                  alt={b.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-5 left-5 md:bottom-7 md:left-7">
                  <span
                    className={`font-heading text-[26px] tracking-tight md:text-[34px] ${
                      b.overlayLight ? "text-background" : "text-foreground"
                    }`}
                  >
                    {b.name}
                  </span>
                </div>
              </div>
            );

            const TextBlock = (
              <div className="flex aspect-square flex-col justify-between p-6 md:p-10">
                <p className="whitespace-pre-line text-[13px] leading-[1.7] text-foreground md:text-[14px]">
                  {b.body}
                </p>
                <div className={imageFirst ? "self-end" : "self-start"}>
                  <SeeProductsBtn handle={b.handle} />
                </div>
              </div>
            );

            return (
              <article
                key={b.handle}
                className="grid grid-cols-1 md:grid-cols-2"
              >
                {imageFirst ? (
                  <>
                    {ImageBlock}
                    {TextBlock}
                  </>
                ) : (
                  <>
                    {TextBlock}
                    {ImageBlock}
                  </>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
