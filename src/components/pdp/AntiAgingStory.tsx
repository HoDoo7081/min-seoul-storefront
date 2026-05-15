import pillarAntiAging from "@/assets/pdp/derma-sense/pillar-anti-aging.png";
import pillarPore from "@/assets/pdp/derma-sense/pillar-pore.png";
import vcEnergyCare from "@/assets/pdp/velvet-cream/energy-care.png";
import vcBarrierSupport from "@/assets/pdp/velvet-cream/barrier-support.png";
import vcMoistureFinish from "@/assets/pdp/velvet-cream/moisture-finish.png";
import esF1 from "@/assets/pdp/essence/feat-1.jpg";
import esF2 from "@/assets/pdp/essence/feat-2.jpg";
import esF3 from "@/assets/pdp/essence/feat-3.jpg";
import { HomecareSolution } from "./HomecareSolution";

type Feature = { image: string; title: string; body: string };

const VELVET_FEATURES: Feature[] = [
  {
    image: vcEnergyCare,
    title: "ATP + NAD\u207A Energy Care",
    body:
      "Powered by ATP and NAD\u207A, this cream helps revitalize the look of tired skin for a fresher, more energized complexion.",
  },
  {
    image: vcBarrierSupport,
    title: "Comforting Barrier Support",
    body:
      "This rich, nourishing formula helps keep skin feeling comfortable, soft, and well-conditioned.",
  },
  {
    image: vcMoistureFinish,
    title: "Velvety Moisture Finish",
    body:
      "Delivers deep hydration with a smooth, velvety texture that absorbs beautifully without feeling heavy.",
  },
];

const ESSENCE_FEATURES: Feature[] = [
  {
    image: esF1,
    title: "Antioxidant Defense",
    body:
      "Powered by potent antioxidants including Glutathione and Tocopherol, this essence neutralizes free radical damage and visibly reducing signs of aging, uneven tone, and inflammation at the source.",
  },
  {
    image: esF2,
    title: "Cell Repair & Regeneration",
    body:
      "The 4GF growth factor complex repairs damaged skin cells and actively promotes new cell turnover. And rebuilding skin from within for visibly firmer, smoother, and more resilient skin over time.",
  },
  {
    image: esF3,
    title: "Safe for All Skin Types",
    body:
      "Formulated with naturally-derived botanical extracts, this essence is gentle enough for even sensitive and reactive skin, delivering visible results without irritation or compromise.",
  },
];

function FeatureRow({ features }: { features: Feature[] }) {
  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5">
        {features.map((f) => (
          <figure key={f.title}>
            <div className="aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-white">
              <img
                src={f.image}
                alt={f.title}
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-3">
              <h3 className="text-[13px] font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-[12px] leading-[1.7] text-muted-foreground">
                {f.body}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}

export function AntiAgingStory({ title: _title }: { title: string }) {
  return (
    <section className="mx-auto max-w-[1280px] px-5 pb-10 pt-4 md:px-10">
      {/* Derma Sense Cleansing Gel */}
      <div>
        <h2 className="text-[22px] font-semibold tracking-tight md:text-[26px]">
          Derma Sense Cleansing Gel
        </h2>

        <div className="mt-6 grid grid-cols-1 items-stretch gap-4 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="aspect-square w-full overflow-hidden rounded-[2px] bg-muted">
              <img
                src={pillarAntiAging}
                alt="Care for every skin type"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="aspect-square w-full overflow-hidden rounded-[2px] bg-muted md:aspect-[2.05/1]">
              <img
                src={pillarPore}
                alt="Anti-aging benefits and deep pore clarifying"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-4">
          <div className="md:col-span-1">
            <h3 className="text-[13px] font-semibold">
              Care for Every Skin Type, Every Stage of Life.
            </h3>
            <p className="mt-1.5 text-[12px] leading-[1.7] text-muted-foreground">
              From children to adults — including those with oily, dry, or sensitive skin. This gentle
              formula is suitable for the whole family and all skin concerns.
            </p>
          </div>
          <div className="md:col-span-2 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-[13px] font-semibold">Anti-Aging Benefits</h3>
              <p className="mt-1.5 text-[12px] leading-[1.7] text-muted-foreground">
                Continuously supplies Coenzyme Q10 to combat aging signs, while LADICAC targets the
                root causes — restoring radiance and elasticity.
              </p>
            </div>
            <div>
              <h3 className="text-[13px] font-semibold">Deep Pore Clarifying</h3>
              <p className="mt-1.5 text-[12px] leading-[1.7] text-muted-foreground">
                Effectively sweeps away trapped sebum and impurities, helping to manage excess oil and
                keep pores clear from buildup.
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-16 border-border" />

      {/* ATP + NAD+ Synergy Velvet Cream */}
      <div>
        <h2 className="text-[22px] font-semibold tracking-tight md:text-[26px]">
          ATP + NAD<sup>+</sup> Synergy Velvet Cream
        </h2>
        <FeatureRow features={VELVET_FEATURES} />
      </div>

      <hr className="my-16 border-border" />

      {/* 4GF Supreme Volumizing & Lifting Essence */}
      <div>
        <h2 className="text-[22px] font-semibold tracking-tight md:text-[26px]">
          4GF Supreme Volumizing & Lifting Essence
        </h2>
        <FeatureRow features={ESSENCE_FEATURES} />
      </div>

      <HomecareSolution />
    </section>
  );
}
