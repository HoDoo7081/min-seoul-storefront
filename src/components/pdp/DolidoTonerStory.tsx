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
          { image: f1, title: "Tea Tree Calming", body: "Tea tree extract soothes redness and helps control breakouts without irritating sensitive skin." },
          { image: f2, title: "pH-Balancing Prep", body: "Resets skin pH after cleansing so serums and creams absorb evenly and perform better." },
          { image: f3, title: "Lightweight & Refreshing", body: "Watery, fast-absorbing texture leaves skin feeling clean, hydrated, and ready for treatment." },
        ],
        systemsTitle: "Why It Works",
        systems: [
          { key: "tea-tree", name: "Tea Tree Complex", image: s1, body: "Naturally antibacterial and calming — perfect for blemish-prone or reactive skin." },
          { key: "ph", name: "pH-Balancing System", image: s2, body: "Restores the acid mantle disrupted by cleansing, supporting a healthy skin environment." },
          { key: "hydra", name: "Light Hydration Boost", image: s3, body: "Humectants deliver a first layer of hydration without weight or stickiness." },
        ],
        resultsImage: results,
        results: [
          { title: "Calmer, Clearer Skin", body: "Visible reduction in redness and breakouts with consistent use." },
          { title: "Better Absorption", body: "Skin feels primed — serums and creams penetrate more effectively." },
          { title: "Daily, All-Skin-Type Care", body: "Gentle enough for daily use across oily, combination, and sensitive skin." },
        ],
      }}
    />
  );
}
