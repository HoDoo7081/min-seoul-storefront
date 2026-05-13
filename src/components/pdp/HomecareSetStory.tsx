import { GenericStory } from "./GenericStory";
import heroWide from "@/assets/pdp/homecare-set/hero-wide.jpg";
import heroSquare from "@/assets/pdp/homecare-set/hero-square.jpg";
import dermaCard from "@/assets/products/cleansing-gel-card.jpg";
import velvetCard from "@/assets/products/velvet-cream-card.jpg";
import essenceCard from "@/assets/products/essence-card.jpg";

export function HomecareSetStory({ title }: { title: string }) {
  return (
    <GenericStory
      config={{
        title,
        features: [
          {
            image: dermaCard,
            title: "Daily Cleansing & Prep",
            body:
              "A gentle cleansing gel and balancing toner reset the skin every morning and night without stripping the barrier.",
          },
          {
            image: essenceCard,
            title: "4GF Essence Boost",
            body:
              "Growth-factor essence and ampoules layer hydration and elasticity support so skin looks plumper week by week.",
          },
          {
            image: velvetCard,
            title: "Velvet Finish & Recovery",
            body:
              "ATP·NAD⁺ velvet cream and barrier care seal in moisture and leave a soft, comfortable veil overnight.",
          },
        ],
        extraImage: { src: heroWide, alt: "Essential Home Care 9-piece set", aspect: "16 / 9" },
        systemsTitle: "What's in the Set",
        systems: [
          {
            key: "step1",
            name: "Step 1 — Cleanse & Balance",
            image: dermaCard,
            body:
              "Derma Sense Cleansing Gel + Dolido Tea Tree Toner. Removes impurities and rebalances pH for healthy, calm skin.",
          },
          {
            key: "step2",
            name: "Step 2 — Treat & Boost",
            image: essenceCard,
            body:
              "4GF Supreme Plumping Essence and targeted ampoules deliver growth factors deep into the skin for visible firmness.",
          },
          {
            key: "step3",
            name: "Step 3 — Seal & Recover",
            image: velvetCard,
            body:
              "ATP·NAD⁺ Velvet Cream and barrier-restoring cream lock in moisture and support overnight recovery.",
          },
        ],
        resultsImage: heroSquare,
        results: [
          { title: "A Complete At-Home Routine", body: "Nine carefully curated products cover every step from cleansing to night recovery." },
          { title: "Visible Skin Improvement in Weeks", body: "Most users report softer texture, more bounce, and a calmer barrier within 4 weeks." },
          { title: "Suitable for All Skin Types", body: "Formulated to be gentle enough for sensitive skin while powerful enough for results." },
        ],
      }}
    />
  );
}
