import type { Product, ProductImage } from "@/lib/types";

export type { Product };

// ─────────────────────────────────────────────────────────────
// IMAGE MAP — 실제 제품 사진 업로드 후 이 부분만 교체하세요.
// Shopify Admin에 이미지 업로드 → URL 복사 → 아래 값 교체
// ─────────────────────────────────────────────────────────────
import cleansingGel from "@/assets/products/cleansing-gel.jpg";
import cleansingGel1 from "@/assets/products/cleansing-gel-1.jpg";
import velvetCream from "@/assets/products/velvet-cream.jpg";
import velvetCream1 from "@/assets/products/velvet-cream-1.jpg";
import essence from "@/assets/products/essence.jpg";
import essence1 from "@/assets/products/essence-1.jpg";

export const PRODUCT_IMAGES: Record<string, string[]> = {
  // The Mute — 올스킨 더마센스 클렌징 겔
  "the-mute-serum": [cleansingGel, cleansingGel1],
  "the-mute-toner": [
    "https://placehold.co/600x600/2d2d2d/ffffff?text=TM+Toner+1",
    "https://placehold.co/600x600/3d3d3d/ffffff?text=TM+Toner+2",
  ],
  "the-mute-cream": [velvetCream, velvetCream1],
  "the-mute-suncare": [
    "https://placehold.co/600x600/2d2d2d/ffffff?text=TM+Sun+1",
    "https://placehold.co/600x600/3d3d3d/ffffff?text=TM+Sun+2",
  ],
  // Aesthein
  "aesthein-serum": [essence, essence1],
  "aesthein-essence": [
    "https://placehold.co/600x600/8b7355/ffffff?text=AE+Essence+1",
    "https://placehold.co/600x600/9b8365/ffffff?text=AE+Essence+2",
  ],
  "aesthein-cream": [
    "https://placehold.co/600x600/8b7355/ffffff?text=AE+Cream+1",
    "https://placehold.co/600x600/9b8365/ffffff?text=AE+Cream+2",
  ],
  "aesthein-mask": [
    "https://placehold.co/600x600/8b7355/ffffff?text=AE+Mask+1",
    "https://placehold.co/600x600/9b8365/ffffff?text=AE+Mask+2",
  ],
  // Giclee
  "giclee-serum": [
    "https://placehold.co/600x600/4a6741/ffffff?text=GC+Serum+1",
    "https://placehold.co/600x600/5a7751/ffffff?text=GC+Serum+2",
  ],
  "giclee-toner": [
    "https://placehold.co/600x600/4a6741/ffffff?text=GC+Toner+1",
    "https://placehold.co/600x600/5a7751/ffffff?text=GC+Toner+2",
  ],
  "giclee-oil": [
    "https://placehold.co/600x600/4a6741/ffffff?text=GC+Oil+1",
    "https://placehold.co/600x600/5a7751/ffffff?text=GC+Oil+2",
  ],
  "giclee-cream": [
    "https://placehold.co/600x600/4a6741/ffffff?text=GC+Cream+1",
    "https://placehold.co/600x600/5a7751/ffffff?text=GC+Cream+2",
  ],
};

// 각 variant별 이미지 (옵션 클릭 시 교체될 이미지)
// 실제 옵션 사진 있으면 여기만 교체
export const VARIANT_IMAGES: Record<string, string> = {
  // The Mute
  "the-mute-serum-50ml": "https://placehold.co/600x600/2d2d2d/ffffff?text=TM+Serum+50ml",
  "the-mute-serum-100ml": "https://placehold.co/600x600/3d3d3d/ffffff?text=TM+Serum+100ml",
  "the-mute-toner-150ml": "https://placehold.co/600x600/2d2d2d/ffffff?text=TM+Toner+150ml",
  "the-mute-toner-300ml": "https://placehold.co/600x600/3d3d3d/ffffff?text=TM+Toner+300ml",
  "the-mute-cream-50ml": "https://placehold.co/600x600/2d2d2d/ffffff?text=TM+Cream+50ml",
  "the-mute-cream-100ml": "https://placehold.co/600x600/3d3d3d/ffffff?text=TM+Cream+100ml",
  "the-mute-suncare-50ml": "https://placehold.co/600x600/2d2d2d/ffffff?text=TM+Sun+50ml",
  // Aesthein
  "aesthein-serum-30ml": "https://placehold.co/600x600/8b7355/ffffff?text=AE+Serum+30ml",
  "aesthein-serum-50ml": "https://placehold.co/600x600/9b8365/ffffff?text=AE+Serum+50ml",
  "aesthein-essence-100ml": "https://placehold.co/600x600/8b7355/ffffff?text=AE+Essence+100ml",
  "aesthein-essence-150ml": "https://placehold.co/600x600/9b8365/ffffff?text=AE+Essence+150ml",
  "aesthein-cream-50ml": "https://placehold.co/600x600/8b7355/ffffff?text=AE+Cream+50ml",
  "aesthein-cream-80ml": "https://placehold.co/600x600/9b8365/ffffff?text=AE+Cream+80ml",
  "aesthein-mask-5ea": "https://placehold.co/600x600/8b7355/ffffff?text=AE+Mask+5ea",
  "aesthein-mask-10ea": "https://placehold.co/600x600/9b8365/ffffff?text=AE+Mask+10ea",
  // Giclee
  "giclee-serum-floral": "https://placehold.co/600x600/4a6741/ffffff?text=GC+Serum+Floral",
  "giclee-serum-green": "https://placehold.co/600x600/5a7751/ffffff?text=GC+Serum+Green",
  "giclee-serum-citrus": "https://placehold.co/600x600/6a8761/ffffff?text=GC+Serum+Citrus",
  "giclee-toner-150ml": "https://placehold.co/600x600/4a6741/ffffff?text=GC+Toner+150ml",
  "giclee-toner-300ml": "https://placehold.co/600x600/5a7751/ffffff?text=GC+Toner+300ml",
  "giclee-oil-30ml": "https://placehold.co/600x600/4a6741/ffffff?text=GC+Oil+30ml",
  "giclee-oil-50ml": "https://placehold.co/600x600/5a7751/ffffff?text=GC+Oil+50ml",
  "giclee-cream-50ml": "https://placehold.co/600x600/4a6741/ffffff?text=GC+Cream+50ml",
  "giclee-cream-100ml": "https://placehold.co/600x600/5a7751/ffffff?text=GC+Cream+100ml",
};
// ─────────────────────────────────────────────────────────────

const toImages = (handle: string, alt: string): ProductImage[] =>
  PRODUCT_IMAGES[handle].map((url, i) => ({ url, altText: `${alt} ${i + 1}` }));

const variantImg = (key: string, alt: string): ProductImage | undefined =>
  VARIANT_IMAGES[key] ? { url: VARIANT_IMAGES[key], altText: alt } : undefined;

export const products: Product[] = [
  // ───────── The Mute ─────────
  {
    id: "tm-1",
    handle: "the-mute-serum",
    title: "Zero Calming Serum",
    vendor: "The Mute",
    brandHandle: "the-mute",
    price: 42000,
    compareAtPrice: 48000,
    shortDescription: "민감해진 피부를 위한 무자극 진정 세럼.",
    description:
      "단 9가지 성분으로 완성한 진정 세럼. 센텔라 아시아티카와 판테놀이 자극받은 피부를 빠르게 가라앉히고, 마데카소사이드가 장벽을 강화합니다.",
    images: toImages("the-mute-serum", "The Mute Zero Calming Serum"),
    variants: [
      { id: "the-mute-serum-50ml", title: "50ml", price: 42000, available: true, image: variantImg("the-mute-serum-50ml", "50ml") },
      { id: "the-mute-serum-100ml", title: "100ml", price: 68000, available: true, image: variantImg("the-mute-serum-100ml", "100ml") },
    ],
    options: [{ name: "용량", values: ["50ml", "100ml"] }],
    tags: ["진정", "민감성", "세럼"],
    isNew: false,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 287,
    ingredients: "센텔라 아시아티카 추출물, 판테놀, 마데카소사이드, 히알루론산.",
    howToUse: "토너 후 2~3방울을 얼굴 전체에 부드럽게 펴 발라주세요.",
    caution: "직사광선을 피해 서늘한 곳에 보관하세요.",
  },
  {
    id: "tm-2",
    handle: "the-mute-toner",
    title: "Pure Toner",
    vendor: "The Mute",
    brandHandle: "the-mute",
    price: 28000,
    shortDescription: "수분과 결정돈을 한번에. 데일리 토너.",
    description:
      "5가지 히알루론산이 즉각적인 수분감을 채워주고, PHA가 각질을 부드럽게 정돈합니다.",
    images: toImages("the-mute-toner", "The Mute Pure Toner"),
    variants: [
      { id: "the-mute-toner-150ml", title: "150ml", price: 28000, available: true, image: variantImg("the-mute-toner-150ml", "150ml") },
      { id: "the-mute-toner-300ml", title: "300ml", price: 46000, available: true, image: variantImg("the-mute-toner-300ml", "300ml") },
    ],
    options: [{ name: "용량", values: ["150ml", "300ml"] }],
    tags: ["수분", "토너"],
    isNew: false,
    isBestSeller: false,
    rating: 4.6,
    reviewCount: 192,
    ingredients: "5종 히알루론산, PHA, 판테놀, 글리세린.",
    howToUse: "세안 후 화장솜 또는 손바닥에 덜어 얼굴 전체에 두드려 흡수시켜 주세요.",
  },
  {
    id: "tm-3",
    handle: "the-mute-cream",
    title: "Barrier Cream",
    vendor: "The Mute",
    brandHandle: "the-mute",
    price: 52000,
    shortDescription: "세라마이드로 채우는 무게감 없는 보습.",
    description:
      "다중 세라마이드 컴플렉스가 피부 장벽을 단단하게 채워주는 가벼운 텍스처의 보습 크림.",
    images: toImages("the-mute-cream", "The Mute Barrier Cream"),
    variants: [
      { id: "the-mute-cream-50ml", title: "50ml", price: 52000, available: true, image: variantImg("the-mute-cream-50ml", "50ml") },
      { id: "the-mute-cream-100ml", title: "100ml", price: 84000, available: false, image: variantImg("the-mute-cream-100ml", "100ml") },
    ],
    options: [{ name: "용량", values: ["50ml", "100ml"] }],
    tags: ["크림", "장벽"],
    isNew: true,
    isBestSeller: false,
    rating: 4.9,
    reviewCount: 118,
    ingredients: "세라마이드 NP, 스쿠알란, 마데카소사이드, 시어버터.",
    howToUse: "스킨케어 마지막 단계에서 적당량을 얼굴 전체에 부드럽게 펴 발라주세요.",
  },
  {
    id: "tm-4",
    handle: "the-mute-suncare",
    title: "Invisible Sun",
    vendor: "The Mute",
    brandHandle: "the-mute",
    price: 32000,
    shortDescription: "백탁 없는 톤업 선크림 SPF50+ PA++++",
    description:
      "백탁 없이 산뜻하게 발리는 데일리 선크림. 무기자차 베이스로 민감한 피부도 안심하고 사용할 수 있어요.",
    images: toImages("the-mute-suncare", "The Mute Invisible Sun"),
    variants: [
      { id: "the-mute-suncare-50ml", title: "50ml", price: 32000, available: true, image: variantImg("the-mute-suncare-50ml", "50ml") },
    ],
    options: [{ name: "용량", values: ["50ml"] }],
    tags: ["선크림", "데일리"],
    isNew: false,
    isBestSeller: false,
    rating: 4.5,
    reviewCount: 76,
    ingredients: "징크옥사이드, 티타늄디옥사이드, 나이아신아마이드.",
    howToUse: "스킨케어 마지막 단계에 충분한 양을 얼굴 전체에 펴 발라주세요.",
  },

  // ───────── Aesthein ─────────
  {
    id: "ae-1",
    handle: "aesthein-serum",
    title: "Gold Peptide Serum",
    vendor: "Aesthein",
    brandHandle: "aesthein",
    price: 52000,
    shortDescription: "골드 펩타이드로 완성하는 탄력 케어.",
    description:
      "5종 펩타이드와 콜로이달 골드가 결합되어 탄력 있고 매끈한 피부 표면을 만들어 줍니다.",
    images: toImages("aesthein-serum", "Aesthein Gold Peptide Serum"),
    variants: [
      { id: "aesthein-serum-30ml", title: "30ml", price: 52000, available: true, image: variantImg("aesthein-serum-30ml", "30ml") },
      { id: "aesthein-serum-50ml", title: "50ml", price: 78000, available: true, image: variantImg("aesthein-serum-50ml", "50ml") },
    ],
    options: [{ name: "용량", values: ["30ml", "50ml"] }],
    tags: ["탄력", "안티에이징", "펩타이드"],
    isNew: false,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 320,
    ingredients: "5종 펩타이드 컴플렉스, 콜로이달 골드, 아데노신, 나이아신아마이드.",
    howToUse: "토너 후 2~3방울을 얼굴 전체에 펴 발라 부드럽게 흡수시켜 주세요.",
  },
  {
    id: "ae-2",
    handle: "aesthein-essence",
    title: "Bifida Essence",
    vendor: "Aesthein",
    brandHandle: "aesthein",
    price: 48000,
    shortDescription: "비피다 발효용해물 92% 고함량 에센스.",
    description:
      "비피다 발효용해물이 피부 본연의 컨디션을 되살려 매끄럽고 윤기 있는 표면을 완성합니다.",
    images: toImages("aesthein-essence", "Aesthein Bifida Essence"),
    variants: [
      { id: "aesthein-essence-100ml", title: "100ml", price: 48000, available: true, image: variantImg("aesthein-essence-100ml", "100ml") },
      { id: "aesthein-essence-150ml", title: "150ml", price: 64000, available: true, image: variantImg("aesthein-essence-150ml", "150ml") },
    ],
    options: [{ name: "용량", values: ["100ml", "150ml"] }],
    tags: ["에센스", "발효", "수분"],
    isNew: false,
    isBestSeller: false,
    rating: 4.7,
    reviewCount: 215,
    ingredients: "비피다 발효용해물 92%, 나이아신아마이드, 판테놀.",
    howToUse: "세안 후 가장 먼저 사용하여 다음 단계의 흡수력을 높여주세요.",
  },
  {
    id: "ae-3",
    handle: "aesthein-cream",
    title: "Ceramide Cream",
    vendor: "Aesthein",
    brandHandle: "aesthein",
    price: 46000,
    compareAtPrice: 52000,
    shortDescription: "세라마이드 9종을 담은 진한 영양 크림.",
    description:
      "9가지 세라마이드와 식물성 오일이 건조한 피부를 풍부하게 감싸주는 영양 크림.",
    images: toImages("aesthein-cream", "Aesthein Ceramide Cream"),
    variants: [
      { id: "aesthein-cream-50ml", title: "50ml", price: 46000, available: true, image: variantImg("aesthein-cream-50ml", "50ml") },
      { id: "aesthein-cream-80ml", title: "80ml", price: 68000, available: true, image: variantImg("aesthein-cream-80ml", "80ml") },
    ],
    options: [{ name: "용량", values: ["50ml", "80ml"] }],
    tags: ["크림", "보습"],
    isNew: false,
    isBestSeller: false,
    rating: 4.6,
    reviewCount: 134,
    ingredients: "세라마이드 9종, 시어버터, 호호바씨오일, 콜레스테롤.",
    howToUse: "스킨케어 마지막 단계에서 적당량을 얼굴 전체에 펴 발라주세요.",
  },
  {
    id: "ae-4",
    handle: "aesthein-mask",
    title: "Glow Mask",
    vendor: "Aesthein",
    brandHandle: "aesthein",
    price: 24000,
    shortDescription: "한장으로 완성하는 광채 시트마스크.",
    description:
      "비타민 C와 글루타치온 컴플렉스가 즉각적인 환한 광채를 부여하는 데일리 시트 마스크.",
    images: toImages("aesthein-mask", "Aesthein Glow Mask"),
    variants: [
      { id: "aesthein-mask-5ea", title: "5매", price: 24000, available: true, image: variantImg("aesthein-mask-5ea", "5매") },
      { id: "aesthein-mask-10ea", title: "10매", price: 42000, available: true, image: variantImg("aesthein-mask-10ea", "10매") },
    ],
    options: [{ name: "용량", values: ["5매", "10매"] }],
    tags: ["마스크", "브라이트닝"],
    isNew: true,
    isBestSeller: false,
    rating: 4.4,
    reviewCount: 98,
    ingredients: "비타민 C 유도체, 글루타치온, 나이아신아마이드.",
    howToUse: "토너 후 마스크를 얼굴에 밀착시킨 뒤 15~20분 후 떼어내고 잔여 에센스를 흡수시켜 주세요.",
  },

  // ───────── Giclee ─────────
  {
    id: "gc-1",
    handle: "giclee-serum",
    title: "Green Serum",
    vendor: "Giclee",
    brandHandle: "giclee",
    price: 38000,
    shortDescription: "유기농 식물 추출물 베이스의 비건 세럼.",
    description:
      "EWG 그린 등급 성분으로 완성한 비건 세럼. 식물성 스쿠알란과 그린티 추출물이 피부에 활력을 더합니다.",
    images: toImages("giclee-serum", "Giclee Green Serum"),
    variants: [
      { id: "giclee-serum-floral", title: "Floral", price: 38000, available: true, image: variantImg("giclee-serum-floral", "Floral") },
      { id: "giclee-serum-green", title: "Green", price: 38000, available: true, image: variantImg("giclee-serum-green", "Green") },
      { id: "giclee-serum-citrus", title: "Citrus", price: 38000, available: false, image: variantImg("giclee-serum-citrus", "Citrus") },
    ],
    options: [{ name: "향", values: ["Floral", "Green", "Citrus"] }],
    tags: ["비건", "세럼", "식물성"],
    isNew: false,
    isBestSeller: true,
    rating: 4.7,
    reviewCount: 246,
    ingredients: "녹차 추출물, 식물성 스쿠알란, 비타민 E, 시카 컴플렉스.",
    howToUse: "토너 후 적당량을 얼굴 전체에 부드럽게 펴 발라주세요.",
  },
  {
    id: "gc-2",
    handle: "giclee-toner",
    title: "Botanical Toner",
    vendor: "Giclee",
    brandHandle: "giclee",
    price: 26000,
    shortDescription: "은은한 허브향이 감도는 데일리 토너.",
    description:
      "라벤더 워터 베이스에 7가지 식물 추출물을 더해 피부를 부드럽게 다듬어 줍니다.",
    images: toImages("giclee-toner", "Giclee Botanical Toner"),
    variants: [
      { id: "giclee-toner-150ml", title: "150ml", price: 26000, available: true, image: variantImg("giclee-toner-150ml", "150ml") },
      { id: "giclee-toner-300ml", title: "300ml", price: 42000, available: true, image: variantImg("giclee-toner-300ml", "300ml") },
    ],
    options: [{ name: "용량", values: ["150ml", "300ml"] }],
    tags: ["토너", "비건"],
    isNew: false,
    isBestSeller: false,
    rating: 4.5,
    reviewCount: 88,
    ingredients: "라벤더 워터, 캐모마일, 로즈마리, 판테놀.",
    howToUse: "세안 후 화장솜에 덜어 결대로 부드럽게 닦아내듯 사용해 주세요.",
  },
  {
    id: "gc-3",
    handle: "giclee-oil",
    title: "Rosehip Oil",
    vendor: "Giclee",
    brandHandle: "giclee",
    price: 44000,
    shortDescription: "콜드프레스드 로즈힙 오일 100%.",
    description:
      "콜드프레스 방식으로 추출한 로즈힙 오일이 빛나는 광채와 영양을 한 번에 채워줍니다.",
    images: toImages("giclee-oil", "Giclee Rosehip Oil"),
    variants: [
      { id: "giclee-oil-30ml", title: "30ml", price: 44000, available: true, image: variantImg("giclee-oil-30ml", "30ml") },
      { id: "giclee-oil-50ml", title: "50ml", price: 64000, available: true, image: variantImg("giclee-oil-50ml", "50ml") },
    ],
    options: [{ name: "용량", values: ["30ml", "50ml"] }],
    tags: ["오일", "비건"],
    isNew: true,
    isBestSeller: false,
    rating: 4.8,
    reviewCount: 64,
    ingredients: "로즈힙 오일 100%.",
    howToUse: "스킨케어 마지막 단계에 1~2방울을 손바닥에 덜어 얼굴 전체를 감싸듯 발라주세요.",
  },
  {
    id: "gc-4",
    handle: "giclee-cream",
    title: "Soothing Cream",
    vendor: "Giclee",
    brandHandle: "giclee",
    price: 36000,
    shortDescription: "연약해진 피부를 위한 가벼운 진정 크림.",
    description:
      "어성초와 시카가 결합되어 트러블 후 진정과 수분 케어를 동시에 도와줍니다.",
    images: toImages("giclee-cream", "Giclee Soothing Cream"),
    variants: [
      { id: "giclee-cream-50ml", title: "50ml", price: 36000, available: true, image: variantImg("giclee-cream-50ml", "50ml") },
      { id: "giclee-cream-100ml", title: "100ml", price: 58000, available: true, image: variantImg("giclee-cream-100ml", "100ml") },
    ],
    options: [{ name: "용량", values: ["50ml", "100ml"] }],
    tags: ["크림", "진정"],
    isNew: false,
    isBestSeller: false,
    rating: 4.3,
    reviewCount: 45,
    ingredients: "어성초 추출물, 마데카소사이드, 판테놀, 알란토인.",
    howToUse: "스킨케어 마지막 단계에서 적당량을 얼굴 전체에 부드럽게 펴 발라주세요.",
  },
];

export const getProduct = (handle: string) =>
  products.find((p) => p.handle === handle);
export const getByBrand = (brandHandle: string) =>
  products.filter((p) => p.brandHandle === brandHandle);
export const getProductByVariantId = (variantId: string) =>
  products.find((p) => p.variants.some((v) => v.id === variantId));
