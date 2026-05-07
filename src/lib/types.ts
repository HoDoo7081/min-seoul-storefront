export interface Brand {
  handle: string; // 'the-mute' | 'aesthein' | 'giclee'
  name: string;
  slogan: string;
  description: string;
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
  title: string;
  price: number;
  available: boolean;
  image?: ProductImage;
}

export interface ProductOption {
  name: string; // e.g. '향', '용량'
  values: string[];
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  vendor: string; // brand name
  brandHandle: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  shortDescription: string;
  images: ProductImage[];
  variants: ProductVariant[];
  options: ProductOption[];
  tags: string[];
  isNew: boolean;
  isBestSeller: boolean;
  rating: number;
  reviewCount: number;
  ingredients?: string;
  howToUse?: string;
  caution?: string;
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
