export type Product = {
  id: string;
  handle: string;
  brandHandle: string;
  brandName: string;
  title: string;
  subtitle: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  description: string;
  ingredients: string;
  howToUse: string;
  variants: { id: string; label: string; available: boolean }[];
  rating: number;
  reviewCount: number;
  badge?: string;
};

const img = (id: string) => `https://images.unsplash.com/${id}?w=900&q=80`;

export const products: Product[] = [
  {
    id: "p1",
    handle: "mute-essence-toner",
    brandHandle: "the-mute",
    brandName: "The Mute",
    title: "Quiet Essence Toner",
    subtitle: "Fermented rice + niacinamide",
    price: 38,
    compareAtPrice: 46,
    images: [img("photo-1556228578-8c89e6adf883"), img("photo-1556228720-195a672e8a03"), img("photo-1570194065650-d99fb4bedf0a")],
    description: "A weightless essence-toner that hydrates, brightens, and refines the look of pores using fermented rice water and 5% niacinamide.",
    ingredients: "Fermented rice water, niacinamide 5%, panthenol, hyaluronic acid, centella asiatica extract.",
    howToUse: "Pat 2–3 drops into clean skin morning and night before serum.",
    variants: [{ id: "v1", label: "150ml", available: true }, { id: "v2", label: "300ml", available: true }],
    rating: 4.8,
    reviewCount: 1284,
    badge: "Bestseller",
  },
  {
    id: "p2",
    handle: "mute-barrier-cream",
    brandHandle: "the-mute",
    brandName: "The Mute",
    title: "Barrier Repair Cream",
    subtitle: "Ceramide complex",
    price: 52,
    images: [img("photo-1612817288484-6f916006741a"), img("photo-1571875257727-256c39da42af")],
    description: "A cushiony moisturizer that rebuilds the skin barrier with multi-ceramides and squalane.",
    ingredients: "Ceramide NP, squalane, madecassoside, shea butter.",
    howToUse: "Apply as the last step of your routine, AM and PM.",
    variants: [{ id: "v1", label: "50ml", available: true }],
    rating: 4.9,
    reviewCount: 642,
  },
  {
    id: "p3",
    handle: "aesthein-glow-serum",
    brandHandle: "aesthein",
    brandName: "Aesthein",
    title: "Hanbang Glow Serum",
    subtitle: "Ginseng + vitamin C",
    price: 64,
    images: [img("photo-1620916566398-39f1143ab7be"), img("photo-1631730486572-226d1f595b68")],
    description: "A radiance-boosting serum blending fermented ginseng with stabilized vitamin C for luminous skin.",
    ingredients: "Fermented ginseng, 10% ascorbyl glucoside, licorice root, niacinamide.",
    howToUse: "Use 3–4 drops on clean skin in the morning.",
    variants: [{ id: "v1", label: "30ml", available: true }, { id: "v2", label: "50ml", available: false }],
    rating: 4.7,
    reviewCount: 893,
    badge: "New",
  },
  {
    id: "p4",
    handle: "aesthein-jade-mist",
    brandHandle: "aesthein",
    brandName: "Aesthein",
    title: "Jade Calming Mist",
    subtitle: "Houttuynia + green tea",
    price: 34,
    images: [img("photo-1608248543803-ba4f8c70ae0b"), img("photo-1556228453-efd6c1ff04f6")],
    description: "An instantly soothing facial mist for stressed and reactive skin.",
    ingredients: "Houttuynia cordata, green tea, panthenol, allantoin.",
    howToUse: "Mist anytime — over makeup or after cleansing.",
    variants: [{ id: "v1", label: "100ml", available: true }],
    rating: 4.6,
    reviewCount: 412,
  },
  {
    id: "p5",
    handle: "giclee-lip-tint",
    brandHandle: "giclee",
    brandName: "Giclée",
    title: "Botanical Lip Tint",
    subtitle: "Plant pigment, satin finish",
    price: 24,
    images: [img("photo-1586495777744-4413f21062fa"), img("photo-1599733589046-8a35aef0a2a8")],
    description: "A featherlight lip tint with rich plant-derived pigment and a comfortable satin finish.",
    ingredients: "Beetroot extract, jojoba oil, vitamin E, candelilla wax.",
    howToUse: "Apply directly to lips. Layer for deeper color.",
    variants: [
      { id: "v1", label: "Rose", available: true },
      { id: "v2", label: "Plum", available: true },
      { id: "v3", label: "Coral", available: true },
    ],
    rating: 4.8,
    reviewCount: 2103,
    badge: "Bestseller",
  },
  {
    id: "p6",
    handle: "giclee-cheek-veil",
    brandHandle: "giclee",
    brandName: "Giclée",
    title: "Cheek Veil Blush",
    subtitle: "Buildable, dewy",
    price: 28,
    images: [img("photo-1631730359585-38a4935cbec4"), img("photo-1583241800698-9c2e0b7e9f7e")],
    description: "A creamy blush that melts into skin for a natural, lit-from-within flush.",
    ingredients: "Squalane, shea butter, mineral pigments, vitamin E.",
    howToUse: "Tap onto cheeks with fingertips and blend.",
    variants: [
      { id: "v1", label: "Peach", available: true },
      { id: "v2", label: "Berry", available: true },
    ],
    rating: 4.7,
    reviewCount: 587,
  },
];

export const getProduct = (handle: string) => products.find((p) => p.handle === handle);
export const getByBrand = (brandHandle: string) => products.filter((p) => p.brandHandle === brandHandle);
