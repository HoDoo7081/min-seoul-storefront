import { GenericStory } from "./GenericStory";
import f1 from "@/assets/pdp/dolido/feat-1.jpg";
import f2 from "@/assets/pdp/dolido/feat-2.jpg";
import f3 from "@/assets/pdp/dolido/feat-3.jpg";
import s1 from "@/assets/pdp/dolido/sys-1.jpg";
import s2 from "@/assets/pdp/dolido/sys-2.jpg";
import s3 from "@/assets/pdp/dolido/sys-3.jpg";
import results from "@/assets/pdp/dolido/results.jpg";

export function DolidoTonerStory({ title }: { title: string }) {
  return (
    <GenericStory
      config={{
        title,
        features: [
          { image: f1, title: "Instant Cooling Effect", body: "Instantly cools the skin by 2.63°C on contact, calming heat and redness while delivering an immediate sensation of freshness." },
          { image: f2, title: "Pore-Tightening Care", body: "Patented mushroom and oat ferment extracts visibly tighten enlarged pores and refine skin texture for a smoother finish." },
          { image: f3, title: "Oil & Moisture Balance", body: "Rebalances sebum and hydration levels, leaving skin neither too oily nor too dry — comfortable all day long." },
        ],
        systemsTitle: "Why It Works",
        systems: [
          { key: "ferment", name: "Patented Ferment Complex", image: s1, body: "Mushroom and oat ferment extracts work synergistically to soothe, tighten pores, and strengthen the skin's natural defenses." },
          { key: "ha", name: "12 Types of Hyaluronic Acid", body: "A multi-weight hyaluronic acid blend penetrates across skin layers for deep, long-lasting hydration without heaviness.", image: s2 },
          { key: "ceramide", name: "5-Layer Ceramide Complex", image: s3, body: "Replenishes ceramides across five layers of the skin barrier to restore resilience and lock in moisture." },
        ],
        resultsImage: results,
        results: [
          { title: "Cool, Calm, Refreshed", body: "Instantly soothes heat and redness with a measurable 2.63°C cooling effect on first use." },
          { title: "Refined, Hydrated Skin", body: "Pores look tighter and skin feels deeply hydrated and balanced with continued use." },
          { title: "Safe for Sensitive Skin", body: "Gentle, barrier-restoring formula suitable for all skin types — including sensitive and reactive skin." },
        ],
      }}
    />
  );
}
