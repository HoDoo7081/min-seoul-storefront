import type { LocalizedString, Product, ProductImage } from "@/lib/types";

export type { Product };

// ─────────────────────────────────────────────────────────────
// IMAGE MAP — 실제 제품 사진 업로드 후 이 부분만 교체하세요.
// ─────────────────────────────────────────────────────────────
import cleansingGel from "@/assets/products/cleansing-gel-card.jpg";
import cleansingGel1 from "@/assets/products/cleansing-gel-card-2.jpg";
import velvetCream from "@/assets/products/velvet-cream-card.jpg";
import velvetCream1 from "@/assets/products/velvet-cream-card-2.jpg";
import essence from "@/assets/products/essence-card.jpg";
import essence1 from "@/assets/products/essence-card-2.jpg";

export const PRODUCT_IMAGES: Record<string, string[]> = {
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

export const VARIANT_IMAGES: Record<string, string> = {
  "the-mute-serum-50ml": "https://placehold.co/600x600/2d2d2d/ffffff?text=TM+Serum+50ml",
  "the-mute-serum-100ml": "https://placehold.co/600x600/3d3d3d/ffffff?text=TM+Serum+100ml",
  "the-mute-toner-150ml": "https://placehold.co/600x600/2d2d2d/ffffff?text=TM+Toner+150ml",
  "the-mute-toner-300ml": "https://placehold.co/600x600/3d3d3d/ffffff?text=TM+Toner+300ml",
  "the-mute-cream-50ml": "https://placehold.co/600x600/2d2d2d/ffffff?text=TM+Cream+50ml",
  "the-mute-cream-100ml": "https://placehold.co/600x600/3d3d3d/ffffff?text=TM+Cream+100ml",
  "the-mute-suncare-50ml": "https://placehold.co/600x600/2d2d2d/ffffff?text=TM+Sun+50ml",
  "aesthein-serum-30ml": "https://placehold.co/600x600/8b7355/ffffff?text=AE+Serum+30ml",
  "aesthein-serum-50ml": "https://placehold.co/600x600/9b8365/ffffff?text=AE+Serum+50ml",
  "aesthein-essence-100ml": "https://placehold.co/600x600/8b7355/ffffff?text=AE+Essence+100ml",
  "aesthein-essence-150ml": "https://placehold.co/600x600/9b8365/ffffff?text=AE+Essence+150ml",
  "aesthein-cream-50ml": "https://placehold.co/600x600/8b7355/ffffff?text=AE+Cream+50ml",
  "aesthein-cream-80ml": "https://placehold.co/600x600/9b8365/ffffff?text=AE+Cream+80ml",
  "aesthein-mask-5ea": "https://placehold.co/600x600/8b7355/ffffff?text=AE+Mask+5ea",
  "aesthein-mask-10ea": "https://placehold.co/600x600/9b8365/ffffff?text=AE+Mask+10ea",
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

const toImages = (handle: string, alt: string): ProductImage[] =>
  PRODUCT_IMAGES[handle].map((url, i) => ({ url, altText: `${alt} ${i + 1}` }));

const variantImg = (key: string, alt: string): ProductImage | undefined =>
  VARIANT_IMAGES[key] ? { url: VARIANT_IMAGES[key], altText: alt } : undefined;

// Localized "Size" label (used as option name)
const SIZE: LocalizedString = { ko: "용량", en: "Size", zh: "容量" };
const SCENT: LocalizedString = { ko: "향", en: "Scent", zh: "香型" };
const SHEETS_5: LocalizedString = { ko: "5매", en: "5 sheets", zh: "5片" };
const SHEETS_10: LocalizedString = { ko: "10매", en: "10 sheets", zh: "10片" };

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
    shortDescription: {
      ko: "민감해진 피부를 위한 무자극 진정 세럼.",
      en: "A gentle calming serum for sensitive, reactive skin.",
      zh: "为敏感肌设计的无刺激舒缓精华。",
    },
    description: {
      ko: "단 9가지 성분으로 완성한 진정 세럼. 센텔라 아시아티카와 판테놀이 자극받은 피부를 빠르게 가라앉히고, 마데카소사이드가 장벽을 강화합니다.",
      en: "A calming serum built on just 9 ingredients. Centella Asiatica and panthenol quickly soothe stressed skin while madecassoside strengthens the barrier.",
      zh: "仅由9种成分构成的舒缓精华。积雪草和泛醇迅速安抚受刺激肌肤，羟基积雪草苷强化肌肤屏障。",
    },
    images: toImages("the-mute-serum", "The Mute Zero Calming Serum"),
    variants: [
      { id: "the-mute-serum-50ml", title: "50ml", price: 42000, available: true, image: variantImg("the-mute-serum-50ml", "50ml") },
      { id: "the-mute-serum-100ml", title: "100ml", price: 68000, available: true, image: variantImg("the-mute-serum-100ml", "100ml") },
    ],
    options: [{ name: SIZE, values: ["50ml", "100ml"] }],
    tags: ["진정", "민감성", "세럼", "serum", "calming"],
    isNew: false,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 287,
    ingredients: {
      ko: "센텔라 아시아티카 추출물, 판테놀, 마데카소사이드, 히알루론산.",
      en: "Centella Asiatica extract, panthenol, madecassoside, hyaluronic acid.",
      zh: "积雪草提取物、泛醇、羟基积雪草苷、透明质酸。",
    },
    howToUse: {
      ko: "토너 후 2~3방울을 얼굴 전체에 부드럽게 펴 발라주세요.",
      en: "After toner, gently apply 2–3 drops over the entire face.",
      zh: "爽肤水后，取2~3滴轻柔涂抹于全脸。",
    },
    caution: {
      ko: "직사광선을 피해 서늘한 곳에 보관하세요.",
      en: "Store in a cool place away from direct sunlight.",
      zh: "请避光，存放于阴凉处。",
    },
  },
  {
    id: "tm-2",
    handle: "the-mute-toner",
    title: "Pure Toner",
    vendor: "The Mute",
    brandHandle: "the-mute",
    price: 28000,
    shortDescription: {
      ko: "수분과 결정돈을 한번에. 데일리 토너.",
      en: "Hydration and gentle exfoliation in one daily toner.",
      zh: "一瓶搞定补水与温和角质护理的日常爽肤水。",
    },
    description: {
      ko: "5가지 히알루론산이 즉각적인 수분감을 채워주고, PHA가 각질을 부드럽게 정돈합니다.",
      en: "Five types of hyaluronic acid deliver instant hydration while PHA gently smooths texture.",
      zh: "五重透明质酸即时补水，PHA温和疏通角质。",
    },
    images: toImages("the-mute-toner", "The Mute Pure Toner"),
    variants: [
      { id: "the-mute-toner-150ml", title: "150ml", price: 28000, available: true, image: variantImg("the-mute-toner-150ml", "150ml") },
      { id: "the-mute-toner-300ml", title: "300ml", price: 46000, available: true, image: variantImg("the-mute-toner-300ml", "300ml") },
    ],
    options: [{ name: SIZE, values: ["150ml", "300ml"] }],
    tags: ["수분", "토너", "toner", "hydration"],
    isNew: false,
    isBestSeller: false,
    rating: 4.6,
    reviewCount: 192,
    ingredients: {
      ko: "5종 히알루론산, PHA, 판테놀, 글리세린.",
      en: "5-type hyaluronic acid, PHA, panthenol, glycerin.",
      zh: "5重透明质酸、PHA、泛醇、甘油。",
    },
    howToUse: {
      ko: "세안 후 화장솜 또는 손바닥에 덜어 얼굴 전체에 두드려 흡수시켜 주세요.",
      en: "After cleansing, apply with a cotton pad or hands and pat to absorb.",
      zh: "洁面后，用化妆棉或手掌取适量轻拍至吸收。",
    },
  },
  {
    id: "tm-3",
    handle: "the-mute-cream",
    title: "Barrier Cream",
    vendor: "The Mute",
    brandHandle: "the-mute",
    price: 52000,
    shortDescription: {
      ko: "세라마이드로 채우는 무게감 없는 보습.",
      en: "Weightless moisture, powered by ceramides.",
      zh: "神经酰胺带来的轻盈滋润。",
    },
    description: {
      ko: "다중 세라마이드 컴플렉스가 피부 장벽을 단단하게 채워주는 가벼운 텍스처의 보습 크림.",
      en: "A lightweight moisturizer where a multi-ceramide complex rebuilds the skin barrier.",
      zh: "多重神经酰胺复合物深层修护肌肤屏障的轻盈面霜。",
    },
    images: toImages("the-mute-cream", "The Mute Barrier Cream"),
    variants: [
      { id: "the-mute-cream-50ml", title: "50ml", price: 52000, available: true, image: variantImg("the-mute-cream-50ml", "50ml") },
      { id: "the-mute-cream-100ml", title: "100ml", price: 84000, available: false, image: variantImg("the-mute-cream-100ml", "100ml") },
    ],
    options: [{ name: SIZE, values: ["50ml", "100ml"] }],
    tags: ["크림", "장벽", "cream", "barrier"],
    isNew: true,
    isBestSeller: false,
    rating: 4.9,
    reviewCount: 118,
    ingredients: {
      ko: "세라마이드 NP, 스쿠알란, 마데카소사이드, 시어버터.",
      en: "Ceramide NP, squalane, madecassoside, shea butter.",
      zh: "神经酰胺NP、角鲨烷、羟基积雪草苷、乳木果油。",
    },
    howToUse: {
      ko: "스킨케어 마지막 단계에서 적당량을 얼굴 전체에 부드럽게 펴 발라주세요.",
      en: "As the last step of your routine, smooth a generous amount across the face.",
      zh: "护肤最后一步，取适量轻柔涂抹全脸。",
    },
  },
  {
    id: "tm-4",
    handle: "the-mute-suncare",
    title: "Invisible Sun",
    vendor: "The Mute",
    brandHandle: "the-mute",
    price: 32000,
    shortDescription: {
      ko: "백탁 없는 톤업 선크림 SPF50+ PA++++",
      en: "No-cast tone-up sunscreen SPF50+ PA++++.",
      zh: "无白斑提亮防晒 SPF50+ PA++++。",
    },
    description: {
      ko: "백탁 없이 산뜻하게 발리는 데일리 선크림. 무기자차 베이스로 민감한 피부도 안심하고 사용할 수 있어요.",
      en: "A daily sunscreen with no white cast. A mineral base makes it gentle enough for sensitive skin.",
      zh: "无白斑、肤感清爽的日常防晒。物理防晒基底，敏感肌也可安心使用。",
    },
    images: toImages("the-mute-suncare", "The Mute Invisible Sun"),
    variants: [
      { id: "the-mute-suncare-50ml", title: "50ml", price: 32000, available: true, image: variantImg("the-mute-suncare-50ml", "50ml") },
    ],
    options: [{ name: SIZE, values: ["50ml"] }],
    tags: ["선크림", "데일리", "선케어", "sun", "sunscreen"],
    isNew: false,
    isBestSeller: false,
    rating: 4.5,
    reviewCount: 76,
    ingredients: {
      ko: "징크옥사이드, 티타늄디옥사이드, 나이아신아마이드.",
      en: "Zinc oxide, titanium dioxide, niacinamide.",
      zh: "氧化锌、二氧化钛、烟酰胺。",
    },
    howToUse: {
      ko: "스킨케어 마지막 단계에 충분한 양을 얼굴 전체에 펴 발라주세요.",
      en: "As your final step, apply a generous layer over the entire face.",
      zh: "护肤最后一步，取足量均匀涂抹于全脸。",
    },
  },

  // ───────── Aesthein ─────────
  {
    id: "ae-1",
    handle: "aesthein-serum",
    title: "Gold Peptide Serum",
    vendor: "Aesthein",
    brandHandle: "aesthein",
    price: 52000,
    shortDescription: {
      ko: "골드 펩타이드로 완성하는 탄력 케어.",
      en: "Firming care powered by gold peptides.",
      zh: "黄金胜肽打造的紧致护理。",
    },
    description: {
      ko: "5종 펩타이드와 콜로이달 골드가 결합되어 탄력 있고 매끈한 피부 표면을 만들어 줍니다.",
      en: "Five peptides combined with colloidal gold sculpt a firm, smooth skin surface.",
      zh: "五重胜肽搭配胶体金，雕塑紧致光滑的肌肤表面。",
    },
    images: toImages("aesthein-serum", "Aesthein Gold Peptide Serum"),
    variants: [
      { id: "aesthein-serum-30ml", title: "30ml", price: 52000, available: true, image: variantImg("aesthein-serum-30ml", "30ml") },
      { id: "aesthein-serum-50ml", title: "50ml", price: 78000, available: true, image: variantImg("aesthein-serum-50ml", "50ml") },
    ],
    options: [{ name: SIZE, values: ["30ml", "50ml"] }],
    tags: ["탄력", "안티에이징", "펩타이드", "세럼", "serum", "anti-aging"],
    isNew: false,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 320,
    ingredients: {
      ko: "5종 펩타이드 컴플렉스, 콜로이달 골드, 아데노신, 나이아신아마이드.",
      en: "5-peptide complex, colloidal gold, adenosine, niacinamide.",
      zh: "五重胜肽复合物、胶体金、腺苷、烟酰胺。",
    },
    howToUse: {
      ko: "토너 후 2~3방울을 얼굴 전체에 펴 발라 부드럽게 흡수시켜 주세요.",
      en: "After toner, smooth 2–3 drops over the face and gently press to absorb.",
      zh: "爽肤水后，取2~3滴均匀涂抹至吸收。",
    },
  },
  {
    id: "ae-2",
    handle: "aesthein-essence",
    title: "Bifida Essence",
    vendor: "Aesthein",
    brandHandle: "aesthein",
    price: 48000,
    shortDescription: {
      ko: "비피다 발효용해물 92% 고함량 에센스.",
      en: "92% bifida ferment lysate, in a high-concentration essence.",
      zh: "92%高浓度双歧杆菌发酵溶胞物精华。",
    },
    description: {
      ko: "비피다 발효용해물이 피부 본연의 컨디션을 되살려 매끄럽고 윤기 있는 표면을 완성합니다.",
      en: "Bifida ferment restores skin's baseline condition, leaving a smooth and luminous surface.",
      zh: "双歧杆菌发酵物唤醒肌肤本源状态，打造光滑润泽的表面。",
    },
    images: toImages("aesthein-essence", "Aesthein Bifida Essence"),
    variants: [
      { id: "aesthein-essence-100ml", title: "100ml", price: 48000, available: true, image: variantImg("aesthein-essence-100ml", "100ml") },
      { id: "aesthein-essence-150ml", title: "150ml", price: 64000, available: true, image: variantImg("aesthein-essence-150ml", "150ml") },
    ],
    options: [{ name: SIZE, values: ["100ml", "150ml"] }],
    tags: ["에센스", "발효", "수분", "essence", "ferment"],
    isNew: false,
    isBestSeller: false,
    rating: 4.7,
    reviewCount: 215,
    ingredients: {
      ko: "비피다 발효용해물 92%, 나이아신아마이드, 판테놀.",
      en: "92% bifida ferment lysate, niacinamide, panthenol.",
      zh: "92%双歧杆菌发酵溶胞物、烟酰胺、泛醇。",
    },
    howToUse: {
      ko: "세안 후 가장 먼저 사용하여 다음 단계의 흡수력을 높여주세요.",
      en: "Use first after cleansing to boost absorption of the next steps.",
      zh: "洁面后第一步使用，可提升后续护肤吸收。",
    },
  },
  {
    id: "ae-3",
    handle: "aesthein-cream",
    title: "Ceramide Cream",
    vendor: "Aesthein",
    brandHandle: "aesthein",
    price: 46000,
    compareAtPrice: 52000,
    shortDescription: {
      ko: "세라마이드 9종을 담은 진한 영양 크림.",
      en: "A rich nourishing cream with 9 ceramides.",
      zh: "蕴含9重神经酰胺的丰润营养面霜。",
    },
    description: {
      ko: "9가지 세라마이드와 식물성 오일이 건조한 피부를 풍부하게 감싸주는 영양 크림.",
      en: "Nine ceramides and botanical oils richly envelop dry skin.",
      zh: "9重神经酰胺与植物精油深度包裹干燥肌肤。",
    },
    images: toImages("aesthein-cream", "Aesthein Ceramide Cream"),
    variants: [
      { id: "aesthein-cream-50ml", title: "50ml", price: 46000, available: true, image: variantImg("aesthein-cream-50ml", "50ml") },
      { id: "aesthein-cream-80ml", title: "80ml", price: 68000, available: true, image: variantImg("aesthein-cream-80ml", "80ml") },
    ],
    options: [{ name: SIZE, values: ["50ml", "80ml"] }],
    tags: ["크림", "보습", "cream", "moisture"],
    isNew: false,
    isBestSeller: false,
    rating: 4.6,
    reviewCount: 134,
    ingredients: {
      ko: "세라마이드 9종, 시어버터, 호호바씨오일, 콜레스테롤.",
      en: "9 ceramides, shea butter, jojoba seed oil, cholesterol.",
      zh: "9重神经酰胺、乳木果油、霍霍巴籽油、胆固醇。",
    },
    howToUse: {
      ko: "스킨케어 마지막 단계에서 적당량을 얼굴 전체에 펴 발라주세요.",
      en: "As your final step, smooth a moderate amount across the face.",
      zh: "护肤最后一步，取适量均匀涂抹全脸。",
    },
  },
  {
    id: "ae-4",
    handle: "aesthein-mask",
    title: "Glow Mask",
    vendor: "Aesthein",
    brandHandle: "aesthein",
    price: 24000,
    shortDescription: {
      ko: "한장으로 완성하는 광채 시트마스크.",
      en: "Instant radiance in a single sheet mask.",
      zh: "一片即成光感的面膜。",
    },
    description: {
      ko: "비타민 C와 글루타치온 컴플렉스가 즉각적인 환한 광채를 부여하는 데일리 시트 마스크.",
      en: "A daily sheet mask with vitamin C and glutathione for instant brightness.",
      zh: "维C与谷胱甘肽复合物即刻提亮的日用面膜。",
    },
    images: toImages("aesthein-mask", "Aesthein Glow Mask"),
    variants: [
      { id: "aesthein-mask-5ea", title: SHEETS_5, price: 24000, available: true, image: variantImg("aesthein-mask-5ea", "5") },
      { id: "aesthein-mask-10ea", title: SHEETS_10, price: 42000, available: true, image: variantImg("aesthein-mask-10ea", "10") },
    ],
    options: [{ name: SIZE, values: [SHEETS_5, SHEETS_10] }],
    tags: ["마스크", "브라이트닝", "mask", "brightening"],
    isNew: true,
    isBestSeller: false,
    rating: 4.4,
    reviewCount: 98,
    ingredients: {
      ko: "비타민 C 유도체, 글루타치온, 나이아신아마이드.",
      en: "Vitamin C derivative, glutathione, niacinamide.",
      zh: "维生素C衍生物、谷胱甘肽、烟酰胺。",
    },
    howToUse: {
      ko: "토너 후 마스크를 얼굴에 밀착시킨 뒤 15~20분 후 떼어내고 잔여 에센스를 흡수시켜 주세요.",
      en: "After toner, apply the mask, leave on for 15–20 min, then remove and pat in any residue.",
      zh: "爽肤水后敷于面部，15~20分钟后取下，将剩余精华轻拍吸收。",
    },
  },

  // ───────── Giclee ─────────
  {
    id: "gc-1",
    handle: "giclee-serum",
    title: "Green Serum",
    vendor: "Giclee",
    brandHandle: "giclee",
    price: 38000,
    shortDescription: {
      ko: "유기농 식물 추출물 베이스의 비건 세럼.",
      en: "A vegan serum built on organic botanical extracts.",
      zh: "以有机植物萃取为基底的纯素精华。",
    },
    description: {
      ko: "EWG 그린 등급 성분으로 완성한 비건 세럼. 식물성 스쿠알란과 그린티 추출물이 피부에 활력을 더합니다.",
      en: "A vegan serum formulated with EWG-green ingredients. Plant squalane and green tea extract revive the skin.",
      zh: "采用EWG绿色等级成分的纯素精华。植物角鲨烷与绿茶提取物焕活肌肤。",
    },
    images: toImages("giclee-serum", "Giclee Green Serum"),
    variants: [
      { id: "giclee-serum-floral", title: "Floral", price: 38000, available: true, image: variantImg("giclee-serum-floral", "Floral") },
      { id: "giclee-serum-green", title: "Green", price: 38000, available: true, image: variantImg("giclee-serum-green", "Green") },
      { id: "giclee-serum-citrus", title: "Citrus", price: 38000, available: false, image: variantImg("giclee-serum-citrus", "Citrus") },
    ],
    options: [{ name: SCENT, values: ["Floral", "Green", "Citrus"] }],
    tags: ["비건", "세럼", "식물성", "serum", "vegan"],
    isNew: false,
    isBestSeller: true,
    rating: 4.7,
    reviewCount: 246,
    ingredients: {
      ko: "녹차 추출물, 식물성 스쿠알란, 비타민 E, 시카 컴플렉스.",
      en: "Green tea extract, plant squalane, vitamin E, cica complex.",
      zh: "绿茶提取物、植物角鲨烷、维生素E、积雪草复合物。",
    },
    howToUse: {
      ko: "토너 후 적당량을 얼굴 전체에 부드럽게 펴 발라주세요.",
      en: "After toner, smooth a moderate amount over the face.",
      zh: "爽肤水后，取适量轻柔涂抹全脸。",
    },
  },
  {
    id: "gc-2",
    handle: "giclee-toner",
    title: "Botanical Toner",
    vendor: "Giclee",
    brandHandle: "giclee",
    price: 26000,
    shortDescription: {
      ko: "은은한 허브향이 감도는 데일리 토너.",
      en: "A daily toner with a soft herbal aroma.",
      zh: "带着淡淡草本香气的日常爽肤水。",
    },
    description: {
      ko: "라벤더 워터 베이스에 7가지 식물 추출물을 더해 피부를 부드럽게 다듬어 줍니다.",
      en: "A lavender-water base infused with seven botanical extracts gently refines skin.",
      zh: "薰衣草水为基底，融入7种植物萃取，温和调理肌肤。",
    },
    images: toImages("giclee-toner", "Giclee Botanical Toner"),
    variants: [
      { id: "giclee-toner-150ml", title: "150ml", price: 26000, available: true, image: variantImg("giclee-toner-150ml", "150ml") },
      { id: "giclee-toner-300ml", title: "300ml", price: 42000, available: true, image: variantImg("giclee-toner-300ml", "300ml") },
    ],
    options: [{ name: SIZE, values: ["150ml", "300ml"] }],
    tags: ["토너", "비건", "toner", "vegan"],
    isNew: false,
    isBestSeller: false,
    rating: 4.5,
    reviewCount: 88,
    ingredients: {
      ko: "라벤더 워터, 캐모마일, 로즈마리, 판테놀.",
      en: "Lavender water, chamomile, rosemary, panthenol.",
      zh: "薰衣草水、洋甘菊、迷迭香、泛醇。",
    },
    howToUse: {
      ko: "세안 후 화장솜에 덜어 결대로 부드럽게 닦아내듯 사용해 주세요.",
      en: "After cleansing, apply with a cotton pad and sweep along the skin's grain.",
      zh: "洁面后取于化妆棉，顺肌理轻柔擦拭。",
    },
  },
  {
    id: "gc-3",
    handle: "giclee-oil",
    title: "Rosehip Oil",
    vendor: "Giclee",
    brandHandle: "giclee",
    price: 44000,
    shortDescription: {
      ko: "콜드프레스드 로즈힙 오일 100%.",
      en: "100% cold-pressed rosehip oil.",
      zh: "100%冷压玫瑰果油。",
    },
    description: {
      ko: "콜드프레스 방식으로 추출한 로즈힙 오일이 빛나는 광채와 영양을 한 번에 채워줍니다.",
      en: "Cold-pressed rosehip oil delivers radiance and nourishment in a single step.",
      zh: "冷压萃取的玫瑰果油一步带来光泽与滋养。",
    },
    images: toImages("giclee-oil", "Giclee Rosehip Oil"),
    variants: [
      { id: "giclee-oil-30ml", title: "30ml", price: 44000, available: true, image: variantImg("giclee-oil-30ml", "30ml") },
      { id: "giclee-oil-50ml", title: "50ml", price: 64000, available: true, image: variantImg("giclee-oil-50ml", "50ml") },
    ],
    options: [{ name: SIZE, values: ["30ml", "50ml"] }],
    tags: ["오일", "비건", "바디", "oil", "body"],
    isNew: true,
    isBestSeller: false,
    rating: 4.8,
    reviewCount: 64,
    ingredients: {
      ko: "로즈힙 오일 100%.",
      en: "100% rosehip oil.",
      zh: "100%玫瑰果油。",
    },
    howToUse: {
      ko: "스킨케어 마지막 단계에 1~2방울을 손바닥에 덜어 얼굴 전체를 감싸듯 발라주세요.",
      en: "As the last step, warm 1–2 drops in palms and press over the entire face.",
      zh: "护肤最后一步，取1~2滴于掌心，轻按全脸。",
    },
  },
  {
    id: "gc-4",
    handle: "giclee-cream",
    title: "Soothing Cream",
    vendor: "Giclee",
    brandHandle: "giclee",
    price: 36000,
    shortDescription: {
      ko: "연약해진 피부를 위한 가벼운 진정 크림.",
      en: "A light soothing cream for compromised skin.",
      zh: "为脆弱肌设计的轻盈舒缓面霜。",
    },
    description: {
      ko: "어성초와 시카가 결합되어 트러블 후 진정과 수분 케어를 동시에 도와줍니다.",
      en: "Houttuynia cordata and cica work together to soothe and hydrate post-breakout skin.",
      zh: "鱼腥草与积雪草携手，于痘后舒缓与补水同步进行。",
    },
    images: toImages("giclee-cream", "Giclee Soothing Cream"),
    variants: [
      { id: "giclee-cream-50ml", title: "50ml", price: 36000, available: true, image: variantImg("giclee-cream-50ml", "50ml") },
      { id: "giclee-cream-100ml", title: "100ml", price: 58000, available: true, image: variantImg("giclee-cream-100ml", "100ml") },
    ],
    options: [{ name: SIZE, values: ["50ml", "100ml"] }],
    tags: ["크림", "진정", "cream", "calming"],
    isNew: false,
    isBestSeller: false,
    rating: 4.3,
    reviewCount: 45,
    ingredients: {
      ko: "어성초 추출물, 마데카소사이드, 판테놀, 알란토인.",
      en: "Houttuynia extract, madecassoside, panthenol, allantoin.",
      zh: "鱼腥草提取物、羟基积雪草苷、泛醇、尿囊素。",
    },
    howToUse: {
      ko: "스킨케어 마지막 단계에서 적당량을 얼굴 전체에 부드럽게 펴 발라주세요.",
      en: "As your final step, gently smooth a moderate amount across the face.",
      zh: "护肤最后一步，取适量轻柔涂抹全脸。",
    },
  },
];

export const getProduct = (handle: string) =>
  products.find((p) => p.handle === handle);
export const getByBrand = (brandHandle: string) =>
  products.filter((p) => p.brandHandle === brandHandle);
export const getProductByVariantId = (variantId: string) =>
  products.find((p) => p.variants.some((v) => v.id === variantId));
