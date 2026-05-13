import { GenericStory } from "./GenericStory";
import f1 from "@/assets/pdp/giclee-cream/feat-1.jpg";
import f2 from "@/assets/pdp/giclee-cream/feat-2.jpg";
import f3 from "@/assets/pdp/giclee-cream/feat-3.jpg";
import s1 from "@/assets/pdp/giclee-cream/sys-1.jpg";
import s2 from "@/assets/pdp/giclee-cream/sys-2.jpg";
import heroWide from "@/assets/pdp/giclee-cream/hero-wide.jpg";
import results from "@/assets/pdp/giclee-cream/results.jpg";

export function GicleeCreamStory({ title }: { title: string }) {
  return (
    <GenericStory
      config={{
        title,
        features: [
          { image: f1, title: "Barrier Restoration", body: "A rich cream that strengthens compromised skin barriers and locks in deep, lasting moisture." },
          { image: f2, title: "Velvety, Melt-In Texture", body: "Buttery cream that melts into skin without heaviness — comfortable for day or night." },
          { image: f3, title: "Ectoin-Powered Defense", body: "Concentrated Ectoin shields the skin from environmental stress while supporting natural recovery." },
        ],
        extraImage: { src: heroWide, alt: "Giclee Ectoin Barrier Restorative Cream", aspect: "16 / 9" },
        systemsTitle: "Built for Sensitive, Compromised Skin",
        systems: [
          { key: "ectoin", name: "Ectoin Recovery Complex", image: s1, body: "Ectoin works at the cellular level to defend, repair, and reinforce a healthy skin barrier." },
          { key: "moisture", name: "Multi-Layer Moisture Lock", image: s2, body: "Ceramides and humectants build a moisture reservoir that lasts hours after application." },
        ],
        resultsImage: results,
        results: [
          { title: "Calmer, More Resilient Skin", body: "Redness and reactivity reduce as the barrier strengthens with regular use." },
          { title: "Plump, Hydrated Finish", body: "Skin looks dewy and feels comfortable — even in dry, harsh environments." },
          { title: "Ideal Post-Procedure Care", body: "Soothing enough for sensitive or post-treatment skin recovery." },
        ],
      }}
    />
  );
}
