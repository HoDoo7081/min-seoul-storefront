import { GenericStory } from "./GenericStory";
import { HomecareSolution } from "./HomecareSolution";
import f1 from "@/assets/pdp/essence/feat-1.jpg";
import f2 from "@/assets/pdp/essence/feat-2.jpg";
import f3 from "@/assets/pdp/essence/feat-3.jpg";
import s1 from "@/assets/pdp/essence/sys-1-new.png";
import s2 from "@/assets/pdp/essence/sys-2-new.png";
import s3 from "@/assets/pdp/essence/sys-3-new.jpg";
import resultsA from "@/assets/pdp/essence/results-a.png";
import resultsB from "@/assets/pdp/essence/results-b.png";

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
        resultsTitle: "Proven Ingredients, Visible Results",
        resultsSubtitle: "Results may vary.",
        resultsImages: [resultsA, resultsB],
        results: [
          {
            title: "Supports skin against oxidative stress.",
            body: "A nourishing blend of Glutathione, Tocopherol, and Glycerin helps keep skin looking healthy, smooth, and refreshed.",
          },
          {
            title: "A powerful 4GF complex for visibly renewed skin.",
            body: "Formulated with EGF, IGF-1, bFGF, and TGF-\u03B21 to help support skin renewal and promote a firmer-looking complexion.",
          },
          {
            title: "Helps brighten the look of dull, uneven skin tone.",
            body: "Glutathione and Niacinamide work together to reveal a more radiant, even-looking complexion.",
          },
        ],
      }}
    />
    <section className="mx-auto max-w-[1280px] px-5 pb-10 md:px-10">
      <HomecareSolution />
    </section>
    </>
  );
}
