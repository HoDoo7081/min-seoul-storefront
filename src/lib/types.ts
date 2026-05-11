export type Locale = "ko" | "en" | "zh";

/** A string that can be either plain (same in every language) or localized per-locale. */
export type LocalizedString = string | Partial<Record<Locale, string>>;

export interface Brand {
  handle: string; // 'the-mute' | 'aesthein' | 'giclee'
  name: string;
  slogan: LocalizedString;
  description: LocalizedString;
  coverImage: string;
  logoImage: string;
  accentColor: string;
}

export interface ProductImage {
  url: string;
  altText: string;
}

export interface ProductVariant {
  id: string;
  title: LocalizedString;
  price: number;
  available: boolean;
  image?: ProductImage;
}

export interface ProductOption {
  name: LocalizedString; // e.g. '향', '용량'
  values: LocalizedString[];
}

export interface Product {
  id: string;
  handle: string;
  title: LocalizedString;
  vendor: string; // brand name
  brandHandle: string;
  price: number;
  compareAtPrice?: number;
  description: LocalizedString;
  shortDescription: LocalizedString;
  images: ProductImage[];
  variants: ProductVariant[];
  options: ProductOption[];
  tags: string[];
  isNew: boolean;
  isBestSeller: boolean;
  rating: number;
  reviewCount: number;
  ingredients?: LocalizedString;
  howToUse?: LocalizedString;
  caution?: LocalizedString;
}

export interface CartItem {
  variantId: string;
  productId: string;
  title: string;
  variantTitle: string;
  price: number;
  quantity: number;
  image: string;
  brandName: string;
}
