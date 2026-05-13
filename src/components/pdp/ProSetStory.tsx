import { GenericStory } from "./GenericStory";
import heroWide from "@/assets/pdp/pro-set/hero-wide.jpg";
import heroSquare from "@/assets/pdp/pro-set/hero-square.jpg";
import dermaCard from "@/assets/products/cleansing-gel-card.jpg";
import velvetCard from "@/assets/products/velvet-cream-card.jpg";
import essenceCard from "@/assets/products/essence-card.jpg";
import gicleeBarrier from "@/assets/products/giclee-barrier-card.jpg";

export function ProSetStory({ title }: { title: string }) {
  return (
    <GenericStory
      config={{
        title,
        features: [
          {
            image: dermaCard,
            title: "Clinic-Grade Prep",
            body:
              "Professional-strength cleansers and toners prepare the skin for advanced treatment and maximize active absorption.",
          },
          {
            image: essenceCard,
            title: "High-Performance Actives",
            body:
              "4GF growth factors, peptides, and hydrating ampoules work together for visible firming and recovery.",
          },
          {
            image: gicleeBarrier,
            title: "Barrier & Recovery Care",
            body:
              "Ectoin barrier creams and post-procedure soothers protect compromised skin and accelerate recovery.",
          },
        ],
        extraImage: { src: heroWide, alt: "Professional Care 10-piece set", aspect: "16 / 9" },
        systemsTitle: "Built for Clinics, Loved at Home",
        systems: [
          {
            key: "cleanse",
            name: "Cleanse & Prep",
            image: dermaCard,
            body:
              "Derma Sense Cleansing Gel and pH-balancing toners ready the skin for high-performance actives.",
          },
          {
            key: "treat",
            name: "Treat & Restore",
            image: essenceCard,
            body:
              "Plumping essence, ATP·NAD⁺ cream, and anti-aging serums deliver clinic-level results in a structured routine.",
          },
          {
            key: "barrier",
            name: "Barrier & After-Care",
            image: gicleeBarrier,
            body:
              "Ectoin barrier line products soothe and rebuild compromised skin — ideal after professional procedures.",
          },
        ],
        resultsImage: heroSquare,
        results: [
          { title: "Complete Professional Routine", body: "10 products curated to mirror an in-clinic protocol you can follow at home." },
          { title: "Designed With Practitioners", body: "Co-developed with 100+ Korean aesthetic professionals for predictable, repeatable results." },
          { title: "Safe for Sensitive & Post-Procedure Skin", body: "Gentle yet effective — formulated to support recovery and long-term skin health." },
        ],
      }}
    />
  );
}
