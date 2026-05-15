import { GenericStory } from "./GenericStory";
import { HomecareSolution } from "./HomecareSolution";
import f1 from "@/assets/pdp/essence/feat-1.jpg";
import f2 from "@/assets/pdp/essence/feat-2.jpg";
import f3 from "@/assets/pdp/essence/feat-3.jpg";
import s1 from "@/assets/pdp/essence/sys-1-new.png";
import s2 from "@/assets/pdp/essence/sys-2-new.png";
import s3 from "@/assets/pdp/essence/sys-3-new.jpg";
import results from "@/assets/pdp/essence/results.jpg";

export function EssenceStory({ title }: { title: string }) {
  return (
    <>
    <GenericStory
      config={{
        title,
        featuresAspect: "1 / 1",
        featuresFit: "cover",
        features: [
          {
            image: f1,
            title: "4GF Plumping Boost",
            body:
              "A complex of EGF, IGF, FGF, and TGF growth factors works deep into skin to visibly plump fine lines and restore bounce.",
          },
          {
            image: f2,
            title: "Intense Hydration Veil",
            body:
              "Layered hyaluronic acids and ceramides flood the skin with moisture, leaving a soft, dewy finish that lasts all day.",
          },
          {
            image: f3,
            title: "Fast-Absorbing Comfort",
            body:
              "Lightweight, non-sticky texture sinks in instantly — perfect under serums, creams, or makeup.",
          },
        ],
        systemsTitle: "Why It Works",
        systems: [
          {
            key: "growth",
            name: "4GF Growth Factor Complex",
            image: s1,
            body:
              "Four targeted growth factors (EGF, IGF, FGF, TGF) work in synergy to support skin regeneration and visibly improve elasticity.",
          },
          {
            key: "hydra",
            name: "Multi-Weight Hyaluronic",
            image: s2,
            body:
              "Multiple molecular weights of hyaluronic acid hydrate every layer of skin — from surface to deep — for a plump, healthy bounce.",
          },
          {
            key: "barrier",
            name: "Ceramide Barrier Care",
            image: s3,
            body:
              "Skin-identical ceramides reinforce the moisture barrier so hydration stays locked in and skin feels resilient.",
          },
        ],
        resultsImage: results,
        results: [
          { title: "Visibly Plumper Skin", body: "Fine lines look softened and skin appears bouncier with continued use." },
          { title: "Long-Lasting Hydration", body: "Moisture levels stay elevated throughout the day, even on dry skin." },
          { title: "Smoother, Healthier Glow", body: "Skin texture refines and a natural radiance returns." },
        ],
      }}
    />
    <section className="mx-auto max-w-[1280px] px-5 pb-10 md:px-10">
      <HomecareSolution />
    </section>
    </>
  );
}
