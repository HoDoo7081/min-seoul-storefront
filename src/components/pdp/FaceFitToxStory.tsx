import { useState } from "react";
import heroVials from "@/assets/pdp/face-fit-tox/hero-vials.png";
import kitOverview from "@/assets/pdp/face-fit-tox/kit-overview.png";
import wrinkleFit from "@/assets/pdp/face-fit-tox/wrinkle-fit.png";
import slimFit from "@/assets/pdp/face-fit-tox/slim-fit.png";
import volumeFit from "@/assets/pdp/face-fit-tox/volume-fit.png";
import ba1 from "@/assets/pdp/face-fit-tox/ba-1.png";
import ba2 from "@/assets/pdp/face-fit-tox/ba-2.png";
import ba3 from "@/assets/pdp/face-fit-tox/ba-3.png";
import ba4 from "@/assets/pdp/face-fit-tox/ba-4.png";
import ingPeptide from "@/assets/pdp/face-fit-tox/ing-peptide.png";
import ingCollagen from "@/assets/pdp/face-fit-tox/ing-collagen.jpg";
import ingGlycosaminoglycan from "@/assets/pdp/face-fit-tox/ing-glycosaminoglycan.jpg";
import ingVitaminC from "@/assets/pdp/face-fit-tox/ing-vitaminc.jpg";
import ingHyaluronic from "@/assets/pdp/face-fit-tox/ing-hyaluronic.jpg";
import ingCaffeine from "@/assets/pdp/face-fit-tox/ing-caffeine.jpg";
import ingSodium from "@/assets/pdp/face-fit-tox/ing-sodium.jpg";
import kipoBadge from "@/assets/pdp/pro-set/kipo-badge.png";

type VialSection = {
  image: string;
  title: string;
  subtitle: string;
  bullets: string[];
  ingredients: { image: string; label: string }[];
};

const VIAL_SECTIONS: VialSection[] = [
  {
    image: wrinkleFit,
    title: "Wrinkle-Fit Amplify",
    subtitle: "Advanced Line Correction",
    bullets: [
      "Instant Smoothing: Powered by high-performance Peptide Complexes to visibly relax the appearance of expression lines.",
      "Structural Support: Formulated with Collagen Boosters to reinforce the skin's natural density and firmness.",
    ],
    ingredients: [
      { image: ingPeptide, label: "Acetyl Hexapeptide-8" },
      { image: ingGlycosaminoglycan, label: "Glycosaminoglycan" },
      { image: ingVitaminC, label: "Vitamin C" },
    ],
  },
  {
    image: slimFit,
    title: "Slim-Fit Amplify",
    subtitle: "Precision Contouring & Sculpting",
    bullets: [
      "Defining Formula: Infused with specialized agents to streamline the jawline and refine facial silhouettes.",
      "Lifting Effect: Promotes superior elasticity to counteract sagging and maintain a tight, sculpted profile.",
    ],
    ingredients: [
      { image: ingSodium, label: "Sodium Deoxycholate" },
      { image: ingCaffeine, label: "Caffeine" },
    ],
  },
  {
    image: volumeFit,
    title: "Volume-Fit Amplify",
    subtitle: "Multi-Level Plumping & Glow",
    bullets: [
      "Deep Hydration: Multi-molecular Hyaluronic Acid delivers intense moisture to the skin's deepest layers.",
      "Luminous Volume: Restores natural-looking fullness and a high-definition radiance.",
    ],
    ingredients: [
      { image: ingHyaluronic, label: "Hyaluronic Acid" },
      { image: ingCollagen, label: "Collagen" },
      { image: ingPeptide, label: "Peptide" },
    ],
  },
];

const BA_IMAGES = [ba1, ba2, ba3, ba4];

export function FaceFitToxStory({ title }: { title: string }) {
  const [activeVial, setActiveVial] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-[1080px] px-5 pb-20 md:px-10">
      {/* Hero header */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-sm bg-muted/30">
          <img
            src={kitOverview}
            alt="Face Fit Tox KIT overview"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="aspect-square overflow-hidden rounded-sm bg-muted/30">
          <img
            src={heroVials}
            alt="Face Fit Tox three vials"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Product title and description */}
      <div className="mt-6 border-b border-border pb-6">
        <h2 className="text-[18px] font-semibold md:text-[20px]">
          {title} <span className="font-normal text-muted-foreground">7ml × 3 vials</span>
        </h2>
        <p className="mt-2 text-[13px] leading-[1.8] text-muted-foreground md:text-[14px]">
          Non-invasive skin contouring beauty kit featuring three layerable ampoules (Slim Fit, Wrinkle Fit, and Volume Fit) designed to visibly improve skin firmness, reduce the appearance of wrinkles, and restore facial volume for a more sculpted, lifted complexion.
        </p>
        <p className="mt-4 flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
          <img src={kipoBadge} alt="KIPO" className="h-4 w-4 object-contain" />
          Patent No. 10-2025-0065451 (KIPO)
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          A professional beauty kit for non-invasive skin contouring, tailored to each individual's skin needs.
        </p>
      </div>

      {/* Why Face Fit-Tox? */}
      <h3 className="mt-14 text-[24px] font-semibold tracking-tight md:text-[28px]">
        Why Face Fit-Tox?
      </h3>

      {/* Three vial images - clickable */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        {VIAL_SECTIONS.map((v, idx) => (
          <button
            key={idx}
            onClick={() => setActiveVial(activeVial === idx ? null : idx)}
            className={`group relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-muted/30 transition-all ${
              activeVial === idx
                ? "ring-2 ring-foreground ring-offset-2"
                : "hover:ring-1 hover:ring-foreground/30"
            }`}
          >
            <img
              src={v.image}
              alt={v.title}
              className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
            />
            {/* Label overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-3">
              <p className="text-[12px] font-medium text-white md:text-[14px]">{v.title.split(" ")[0]}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Expandable content for selected vial */}
      {activeVial !== null && (
        <div className="mt-6 animate-in fade-in slide-in-from-top-2 rounded-lg border border-border bg-muted/20 p-6 duration-200 md:p-8">
          <h4 className="text-[18px] font-semibold md:text-[20px]">
            {VIAL_SECTIONS[activeVial].title}{" "}
            <span className="text-[13px] font-normal text-muted-foreground md:text-[14px]">
              {VIAL_SECTIONS[activeVial].subtitle}
            </span>
          </h4>
          <ul className="mt-4 flex flex-col gap-2">
            {VIAL_SECTIONS[activeVial].bullets.map((b, i) => (
              <li key={i} className="flex gap-2 text-[13px] leading-[1.7] text-muted-foreground md:text-[14px]">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-foreground/40" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          {/* Ingredient circles */}
          <div className="mt-6 flex flex-wrap gap-5">
            {VIAL_SECTIONS[activeVial].ingredients.map((ing, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="h-14 w-14 overflow-hidden rounded-full md:h-16 md:w-16">
                  <img
                    src={ing.image}
                    alt={ing.label}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-center text-[10px] text-muted-foreground md:text-[11px]">
                  {ing.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Before & After */}
      <h3 className="mt-20 text-center text-[24px] font-semibold tracking-tight md:text-[28px]">
        Before & After
      </h3>
      <div className="mt-4 flex justify-center gap-12 text-[13px] font-medium md:text-[14px]">
        <span className="rounded bg-[#1a2a5e] px-4 py-1 text-white">Before</span>
        <span className="rounded bg-[#1a2a5e] px-4 py-1 text-white">After</span>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        {BA_IMAGES.map((img, idx) => (
          <div key={idx} className="overflow-hidden rounded-sm">
            <img
              src={img}
              alt={`Before and After ${idx + 1}`}
              className="w-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Product Info Footer */}
      <div className="mt-16 border-t border-border pt-8 text-[12px] leading-[2] text-muted-foreground md:text-[13px]">
        <p><strong className="text-foreground">Product Name</strong><br />AESTHEIN Ultra Face Fit Tox (Slim Fit, Tirk Fit, Valume Fit)</p>
        <p className="mt-4"><strong className="text-foreground">Volume</strong><br />7ml × 3</p>
        <p className="mt-4"><strong className="text-foreground">Expiration Date</strong><br />See label</p>
        <p className="mt-4"><strong className="text-foreground">Country of Origin</strong><br />Republic of Korea, MADE IN KOREA</p>
        <p className="mt-4"><strong className="text-foreground">Cosmetic Manufacturer</strong><br />See label</p>
        <p className="mt-4"><strong className="text-foreground">Responsible Distributor</strong><br />AESTHEIN Co., Ltd.<br />B410-3, 4th Floor, KOTRA, A-33 Songdomirae-ro, Yeonsu-gu, Incheon, Republic of Korea</p>
        <p className="mt-4"><strong className="text-foreground">How to Use</strong><br />This product is designed for use by licensed estheticians and skincare professionals.<br />Proper application training is required before use.</p>
        <p className="mt-4"><strong className="text-foreground">Precautions</strong></p>
        <ul className="ml-4 list-disc">
          <li>If redness, swelling, itching, or any other adverse reactions occur during or after use, discontinue immediately and consult a dermatologist or medical professional.</li>
          <li>Avoid applying to areas with open wounds or broken skin.</li>
          <li>Keep out of reach of children.</li>
          <li>Store away from direct sunlight.</li>
          <li>Please read all instructions and precautions thoroughly before use. If any issues arise with this product, compensation will be provided in accordance with consumer dispute resolution standards. For inquiries, contact our consumer support line.</li>
        </ul>
      </div>
    </section>
  );
}
