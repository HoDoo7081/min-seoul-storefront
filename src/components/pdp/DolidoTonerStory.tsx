import { useState } from "react";
import f1 from "@/assets/pdp/dolido/feat-1.jpg";
import f2 from "@/assets/pdp/dolido/feat-2.jpg";
import f3 from "@/assets/pdp/dolido/feat-3.jpg";
import s1 from "@/assets/pdp/dolido/sys-1.jpg";
import s2 from "@/assets/pdp/dolido/sys-2.jpg";
import s3 from "@/assets/pdp/dolido/sys-3.jpg";
import w1 from "@/assets/pdp/dolido/way-1.jpg";
import w2 from "@/assets/pdp/dolido/way-2.jpg";
import w3 from "@/assets/pdp/dolido/way-3.jpg";

const features = [
  {
    image: f1,
    title: "Instant Skin Cooling",
    body: "Reduces skin temperature by 2.63°C upon application, immediately soothing heat-induced irritation and calming sensitized or UV-stressed skin.",
  },
  {
    image: f2,
    title: "Gentle Exfoliation & pH Reset",
    body: "A low-pH formula with PHA refines skin texture, boosts absorption of subsequent skincare, and restores the skin's natural balance after cleansing.",
  },
  {
    image: f3,
    title: "Deep Hydration & Barrier Repair",
    body: "12 types of hyaluronic acid deliver ultra-precise moisture layering across all skin layers, while the 5-Layer Ceramide Complex and Panthenol reinforce the skin barrier and prevent moisture loss.",
  },
];

const ingredients = [
  {
    key: "ha",
    name: "12 Types of Hyaluronic Acid",
    image: s2,
    body: "Delivers ultra-precise moisture layering across all skin layers for deep, long-lasting hydration.",
  },
  {
    key: "albatrellus",
    name: "Albatrellus Confluens Extract",
    image: s1,
    body: "Instantly reduces skin temperature by 2.63°C, providing immediate cooling, antioxidant protection, and soothing relief.",
  },
  {
    key: "ceramide",
    name: "5-Layer Ceramide Complex",
    image: s3,
    body: "Rebuilds and fortifies the skin barrier, preventing moisture loss and supporting long-term skin resilience.",
  },
];

const ways = [
  {
    image: w1,
    step: "01",
    body: "Soak a cotton pad with toner and gently press onto skin for 5–10 minutes as a pack.",
  },
  {
    image: w2,
    step: "02",
    body: "Pour into a mist bottle and spritz directly onto skin for a refreshing toning mist.",
  },
  {
    image: w3,
    step: "03",
    body: "Pour into a bubble toner device and apply as a bubble toner for enhanced absorption.",
  },
];

export function DolidoTonerStory({ title }: { title: string }) {
  const [active, setActive] = useState(0);
  const ing = ingredients[active];

  return (
    <section className="mx-auto max-w-[1280px] px-5 pb-10 pt-4 md:px-10">
      <h2 className="text-[22px] font-semibold tracking-tight md:text-[26px]">
        {title}
      </h2>

      {/* Top features */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5">
        {features.map((f, i) => (
          <figure key={i}>
            <div className="w-full overflow-hidden rounded-[2px] bg-muted" style={{ aspectRatio: "4 / 3" }}>
              <img src={f.image} alt={f.title} className="h-full w-full object-cover" />
            </div>
            <figcaption className="mt-3">
              <h3 className="text-[13px] font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-[12px] leading-[1.7] text-muted-foreground">{f.body}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Key Ingredients */}
      <div className="mt-20">
        <h2 className="text-[22px] font-semibold tracking-tight md:text-[26px]">
          Key Ingredients
        </h2>

        <div className="mt-8 grid items-center gap-8 md:grid-cols-2 md:gap-16">
          <div key={ing.key} className="aspect-square w-full overflow-hidden rounded-[2px] bg-muted animate-fade-in">
            <img src={ing.image} alt={ing.name} className="h-full w-full object-cover" />
          </div>
          <div key={`${ing.key}-text`} className="animate-fade-in">
            <h3 className="text-[24px] font-semibold tracking-tight md:text-[28px]">{ing.name}</h3>
            <p className="mt-4 max-w-[420px] text-[13px] leading-[1.8] text-muted-foreground">{ing.body}</p>
          </div>
        </div>

        <div
          className="mt-10 grid border-t border-border"
          style={{ gridTemplateColumns: `repeat(${ingredients.length}, minmax(0, 1fr))` }}
        >
          {ingredients.map((it, i) => {
            const isActive = i === active;
            return (
              <button
                key={it.key}
                onClick={() => setActive(i)}
                className="-mt-px border-t-2 py-4 text-center text-[12px] transition-colors"
                style={{
                  borderColor: isActive ? "var(--color-foreground)" : "transparent",
                  color: isActive ? "var(--color-foreground)" : "var(--color-muted-foreground)",
                  fontWeight: isActive ? 600 : 400,
                  textDecoration: isActive ? "underline" : "none",
                  textUnderlineOffset: "4px",
                }}
              >
                {it.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* One Toner, Three Ways to Reset */}
      <div className="mt-20">
        <h2 className="text-[22px] font-semibold tracking-tight md:text-[26px]">
          One Toner, Three Ways to Reset
        </h2>
        <p className="mt-2 text-[13px] leading-[1.7] text-muted-foreground">
          Customize your routine — the same toner works three different ways to fit your skin's needs, morning or night.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5">
          {ways.map((w, i) => (
            <figure key={i}>
              <div className="w-full overflow-hidden rounded-[2px] bg-muted" style={{ aspectRatio: "1 / 1" }}>
                <img src={w.image} alt={`Step ${w.step}`} className="h-full w-full object-cover" />
              </div>
              <figcaption className="mt-3">
                <p className="text-[12px] text-muted-foreground">{w.step}</p>
                <p className="mt-1 text-[12px] leading-[1.7] text-muted-foreground">{w.body}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
