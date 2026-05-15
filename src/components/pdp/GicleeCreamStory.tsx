import f1 from "@/assets/pdp/giclee-cream/feat-1-new.jpg";
import f2 from "@/assets/pdp/giclee-cream/feat-2-new.png";
import f3 from "@/assets/pdp/giclee-cream/feat-3-new.jpg";

type Feature = { image: string; title: string; body: string };

const FEATURES: Feature[] = [
  {
    image: f1,
    title: "Barrier Repair & Restoration",
    body:
      "Formulated with Ectoin, a naturally derived cell-protective ingredient, this cream deeply replenishes moisture, reinforces the skin barrier, and helps damaged skin recover its natural resilience.",
  },
  {
    image: f2,
    title: "Soothing & Calming",
    body:
      "Designed for sensitive and compromised skin, it delivers immediate relief from irritation and redness while restoring a calm, stable skin condition with every use.",
  },
  {
    image: f3,
    title: "Antioxidant Protection",
    body:
      "Powered by naturally sourced botanical extracts, it shields skin from environmental stressors including UV damage and pollution, helping to visibly reduce signs of aging and maintain a healthy, balanced complexion.",
  },
];

export function GicleeCreamStory({ title }: { title: string }) {
  return (
    <section className="mx-auto max-w-[1280px] px-5 pb-10 pt-4 md:px-10">
      <h2 className="text-[22px] font-semibold tracking-tight md:text-[26px]">
        {title}
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5">
        {FEATURES.map((f) => (
          <figure key={f.title}>
            <div className="aspect-square w-full overflow-hidden rounded-[2px] bg-muted">
              <img
                src={f.image}
                alt={f.title}
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-3">
              <h3 className="text-[13px] font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-[12px] leading-[1.7] text-muted-foreground">
                {f.body}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
