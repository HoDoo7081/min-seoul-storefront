export type Brand = {
  handle: string;
  name: string;
  tagline: string;
  description: string;
  colorVar: string;
  image: string;
};

export const brands: Brand[] = [
  {
    handle: "the-mute",
    name: "The Mute",
    tagline: "Quiet luxury for skin",
    description: "Minimalist daily essentials crafted with fermented botanicals and quiet precision.",
    colorVar: "var(--color-brand-mute)",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=80",
  },
  {
    handle: "aesthein",
    name: "Aesthein",
    tagline: "Sensorial skincare ritual",
    description: "Performance formulas inspired by traditional Korean herbology and modern biotech.",
    colorVar: "var(--color-brand-aesthein)",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&q=80",
  },
  {
    handle: "giclee",
    name: "Giclée",
    tagline: "Botanical color, plant truth",
    description: "Clean color cosmetics built on plant-derived pigments and nourishing oils.",
    colorVar: "var(--color-brand-giclee)",
    image: "https://images.unsplash.com/photo-1522335789203-aaa6c4d4cf4d?w=1200&q=80",
  },
];
