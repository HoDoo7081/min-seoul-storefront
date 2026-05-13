import { GenericStory } from "./GenericStory";
import f1 from "@/assets/pdp/anti-aging/feat-1.jpg";
import f2 from "@/assets/pdp/anti-aging/feat-2.jpg";
import f3 from "@/assets/pdp/anti-aging/feat-3.jpg";
import f4 from "@/assets/pdp/anti-aging/feat-4.jpg";
import wide from "@/assets/pdp/anti-aging/hero-wide.jpg";
import sq from "@/assets/pdp/anti-aging/hero-square.jpg";
import full from "@/assets/pdp/anti-aging/full.jpg";

export function AntiAgingStory({ title }: { title: string }) {
  return (
    <GenericStory
      config={{
        title,
        features: [
          {
            image: f1,
            title: "Step 1 — Renew",
            body:
              "Begin with a targeted serum that visibly smooths fine lines and refines skin texture.",
          },
          {
            image: f2,
            title: "Step 2 — Restore",
            body:
              "A nourishing cream replenishes moisture and restores firmness for a more youthful look.",
          },
          {
            image: f3,
            title: "Step 3 — Reinforce",
            body:
              "Seal the routine with an intensive treatment that locks in radiance overnight.",
          },
        ],
        extraImage: { src: wide, alt: "Anti-Aging Line set", aspect: "16 / 9" },
        systemsTitle: "Why the Set Works Together",
        systems: [
          {
            key: "synergy",
            name: "Layered Synergy",
            image: sq,
            body:
              "Each step builds on the next — serum, cream, and treatment work in sequence for visibly firmer, plumper skin.",
          },
          {
            key: "complete",
            name: "Complete Routine",
            image: full,
            body:
              "Designed as a full anti-aging ritual so you don't have to mix and match — everything you need in one set.",
          },
          {
            key: "premium",
            name: "Premium Actives",
            image: f4,
            body:
              "Formulated with peptides, growth factors, and antioxidants targeted at the visible signs of aging.",
          },
        ],
        results: [
          { title: "Smoother Fine Lines", body: "With consistent use, lines appear softened and skin looks visibly plumper." },
          { title: "Firmer, Lifted Look", body: "Skin feels tighter and more elastic from the very first weeks." },
          { title: "Renewed Radiance", body: "Dullness fades and a healthy glow returns." },
        ],
      }}
    />
  );
}
