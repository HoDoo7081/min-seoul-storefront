import { GenericStory } from "./GenericStory";
import f1 from "@/assets/pdp/giclee-barrier/feat-1.jpg";
import f2 from "@/assets/pdp/giclee-barrier/feat-2.jpg";
import f3 from "@/assets/pdp/giclee-barrier/feat-3.jpg";
import s1 from "@/assets/pdp/giclee-barrier/sys-1.jpg";
import s2 from "@/assets/pdp/giclee-barrier/sys-2.jpg";
import heroWide from "@/assets/pdp/giclee-barrier/hero-wide.jpg";
import results from "@/assets/pdp/giclee-barrier/results.jpg";

export function GicleeBarrierStory({ title }: { title: string }) {
  return (
    <GenericStory
      config={{
        title,
        features: [
          { image: f1, title: "Step 1 — Cleanse", body: "Giclee pH-Balancing Gel Cleanser preps the skin without disturbing its acid mantle." },
          { image: f2, title: "Step 2 — Restore", body: "Ectoin Barrier Restorative Cream rebuilds and protects the moisture barrier." },
          { image: f3, title: "Step 3 — Defend", body: "The complete Barrier Line works in concert to defend skin against daily environmental stress." },
        ],
        extraImage: { src: heroWide, alt: "Giclee THE CLINIC Barrier Line", aspect: "16 / 9" },
        systemsTitle: "Clinical-Grade Barrier Care",
        systems: [
          { key: "ectoin", name: "Ectoin at the Core", image: s1, body: "Every product is anchored by Ectoin — a clinically proven extremolyte that protects against dryness and stress." },
          { key: "system", name: "Complete Routine, By Design", image: s2, body: "Cleanser + cream are formulated to layer perfectly, amplifying barrier recovery as a system." },
        ],
        resultsImage: results,
        results: [
          { title: "Visible Barrier Recovery", body: "Skin appears calmer, less reactive, and more hydrated within weeks." },
          { title: "All-Day Comfort", body: "No tightness, no flakiness — just soft, balanced, comfortable skin." },
          { title: "Trusted by Clinicians", body: "Used in professional settings for sensitive and post-procedure skin care." },
        ],
      }}
    />
  );
}
