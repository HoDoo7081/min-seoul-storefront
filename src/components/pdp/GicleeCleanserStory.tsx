import { GenericStory } from "./GenericStory";
import f1 from "@/assets/pdp/giclee-cleanser/feat-1.jpg";
import f2 from "@/assets/pdp/giclee-cleanser/feat-2.jpg";
import f3 from "@/assets/pdp/giclee-cleanser/feat-3.jpg";
import s1 from "@/assets/pdp/giclee-cleanser/sys-1.jpg";
import s2 from "@/assets/pdp/giclee-cleanser/sys-2.jpg";
import heroWide from "@/assets/pdp/giclee-cleanser/hero-wide.jpg";
import results from "@/assets/pdp/giclee-cleanser/results.jpg";

export function GicleeCleanserStory({ title }: { title: string }) {
  return (
    <GenericStory
      config={{
        title,
        features: [
          { image: f1, title: "pH-Balanced Cleanse", body: "A weakly acidic gel cleanser that respects the skin's natural pH while removing impurities and excess sebum." },
          { image: f2, title: "Soft, Cushiony Lather", body: "Rich, dense foam wraps the skin gently — no squeaky tightness, no stripping." },
          { image: f3, title: "Texture That Transforms", body: "From clear gel to luxurious lather: a satisfying, sensory cleansing ritual every morning and night." },
        ],
        extraImage: { src: heroWide, alt: "Giclee pH-Balancing Gel Cleanser", aspect: "16 / 9" },
        systemsTitle: "Why It Works",
        systems: [
          { key: "ectoin", name: "Ectoin Barrier Defense", image: s1, body: "Ectoin shields the skin from environmental stress and helps preserve hydration during cleansing." },
          { key: "ph", name: "pH-Optimized Surfactants", image: s2, body: "Mild, non-irritating surfactants cleanse thoroughly without disrupting the acid mantle." },
        ],
        resultsImage: results,
        results: [
          { title: "Comfortably Clean Skin", body: "No tight, dry feeling — skin feels soft and balanced right after rinsing." },
          { title: "Healthier Barrier Over Time", body: "Daily use supports a stronger, more resilient moisture barrier." },
          { title: "Perfect Routine Starter", body: "An ideal first step for the Giclee Barrier Line — preps skin for serums and creams." },
        ],
      }}
    />
  );
}
