import { HomecareSolution } from "./HomecareSolution";
import faceFitTox from "@/assets/pdp/pro-set/face-fit-tox.png";
import faceFitToxVials from "@/assets/pdp/pro-set/face-fit-tox-vials.jpg";
import dermaSense from "@/assets/pdp/pro-set/derma-sense.png";
import essence from "@/assets/pdp/pro-set/essence.png";
import velvetCream from "@/assets/pdp/pro-set/velvet-cream.png";
import allSkinMask from "@/assets/pdp/pro-set/all-skin-mask.png";
import sunCream from "@/assets/pdp/pro-set/sun-cream.png";
import exoBooster from "@/assets/pdp/pro-set/exo-booster.png";
import mediAmpoule from "@/assets/pdp/pro-set/medi-ampoule.png";
import brighteningSerum from "@/assets/pdp/pro-set/brightening-serum.png";
import antiPollution from "@/assets/pdp/pro-set/anti-pollution.png";
import kipoBadge from "@/assets/pdp/pro-set/kipo-badge.png";
import heroBanner from "@/assets/pdp/pro-set/hero-banner.png";

type ProductCard = {
  image: string;
  name: string;
  size: string;
  body: string;
};

const PRODUCTS: ProductCard[] = [
  {
    image: dermaSense,
    name: "Derma Sense Cleansing Gel",
    size: "300ml",
    body: "is a gentle yet powerful formula for all skin types that deeply cleanses pores while delivering anti-aging benefits with Coenzyme Q10 and LADICAC.",
  },
  {
    image: essence,
    name: "4GF Supreme Plumping Essence",
    size: "40ml",
    body: "is a gentle yet powerful formula for all skin types that deeply cleanses pores while delivering anti-aging benefits with Coenzyme Q10 and LADICAC.",
  },
  {
    image: velvetCream,
    name: "ATP + NAD⁺ Synergy Velvet Cream",
    size: "150ml",
    body: "is a brightening formula for all skin types that deeply cleanses pores while delivering anti-aging benefits with Coenzyme Q10 and LADICAC.",
  },
  {
    image: exoBooster,
    name: "EXO Bubble Booster",
    size: "200ml",
    body: "is a multi-functional booster with sea water minerals, Cica EXO complex, and 7 types of hyaluronic acid to deeply hydrate, soothe, and strengthen the skin barrier.",
  },
  {
    image: mediAmpoule,
    name: "Medi Formula Ampoule",
    size: "50ml",
    body: "is a high-performance ampoule with Hydrolyzed DNA, 12 complex vitamins, and 7 types of hyaluronic acid to deeply regenerate, hydrate, and visibly refine skin texture and elasticity.",
  },
  {
    image: brighteningSerum,
    name: "Brightening Barrier Serum",
    size: "",
    body: "is a brightening serum that combines Glutathione, Niacinamide, and Tranexamic Acid to inhibit melanin, even skin tone, and soothe sensitivity while deeply hydrating and strengthening the skin barrier.",
  },
  {
    image: antiPollution,
    name: "Anti-Pollution Shield Day Cream",
    size: "50ml",
    body: "is a dual-certified functional cream that shields skin from UV rays and environmental pollutants while delivering Niacinamide and Adenosine via nanotechnology to visibly improve wrinkles and brighten skin tone.",
  },
  {
    image: allSkinMask,
    name: "All-Skin Mask",
    size: "25g*10ea",
    body: "is a dual-certified microbiome mask formulated with Microbiome, Illite, Mineral Water, and Mucin to restore the skin ecosystem from within, visibly tightening pores, improving elasticity, and brightening skin tone in a single use.",
  },
  {
    image: sunCream,
    name: "Soft Glow Tone-Up Sun Cream",
    size: "50ml",
    body: "is a triple-certified SPF 50+ / PA+++ sunscreen formulated with Glutathione, REGU-AGE PF, and 7 natural extracts to protect against UV rays, visibly brighten skin tone, and improve wrinkles while delivering a natural soft-glow finish.",
  },
];

export function ProSetDetail({ title }: { title: string }) {
  return (
    <section className="mx-auto max-w-[1280px] px-5 pb-16 md:px-10">
      {/* Hero banner */}
      <div className="relative w-full overflow-hidden rounded-[2px]">
        <img
          src={heroBanner}
          alt={title}
          className="block w-full"
        />
      </div>

      {/* Face Fit Tox KIT */}
      <div className="mt-12 grid gap-3 md:grid-cols-[1fr_2fr]">
        <div className="aspect-square w-full overflow-hidden rounded-[2px] bg-muted">
          <img
            src={faceFitTox}
            alt="Face Fit Tox KIT"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="aspect-[2/1] w-full overflow-hidden rounded-[2px] bg-muted">
          <img
            src={faceFitToxVials}
            alt="Face Fit Tox three vials"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="mt-4 border-b border-border pb-5">
        <p className="text-[13px] leading-[1.7]">
          <span className="font-semibold">Face Fit Tox KIT</span>{" "}
          <span className="text-muted-foreground">7ml × 3 vials</span>
        </p>
        <p className="mt-1 text-[12px] leading-[1.7] text-muted-foreground">
          is a non-invasive skin contouring beauty kit featuring three-layered
          ampoules (Slim Fit, Wrinkle Fit, and Volume Fit) designed to visibly
          improve skin firmness, reduce the appearance of wrinkles, and restore
          facial volume for a more sculpted, lifted complexion.
        </p>
        <p className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
          <img
            src={kipoBadge}
            alt="KIPO"
            className="h-4 w-4 object-contain"
          />
          Patent No. 10-2025-0065451 (KIPO)
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          A professional beauty kit for non-invasive skin contouring, tailored
          to each individual's skin needs.
        </p>
      </div>

      {/* 3x3 product grid */}
      <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
        {PRODUCTS.map((p, i) => (
          <figure key={i}>
            <div className="aspect-square w-full overflow-hidden rounded-[2px] bg-muted">
              <img
                src={p.image}
                alt={p.name}
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-3">
              <p className="text-[13px] leading-[1.5]">
                <span className="font-semibold">{p.name}</span>
                {p.size && (
                  <span className="text-muted-foreground"> {p.size}</span>
                )}
              </p>
              <p className="mt-1.5 text-[12px] leading-[1.7] text-muted-foreground">
                {p.body}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Reused ALL SKIN, HOMECARE SOLUTION */}
      <HomecareSolution />
    </section>
  );
}
