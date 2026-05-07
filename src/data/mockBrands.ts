import type { Brand } from "@/lib/types";

export type { Brand };

export const brands: Brand[] = [
  {
    handle: "the-mute",
    name: "The Mute",
    slogan: "Silence in Every Drop",
    description:
      "미니멀한 성분, 극대화된 효과. 불필요한 것은 모두 덜어낸 스킨케어.",
    coverImage:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1600&q=80",
    logoImage: "https://placehold.co/240x80/2d2d2d/ffffff?text=THE+MUTE",
    accentColor: "#2d2d2d",
  },
  {
    handle: "aesthein",
    name: "Aesthein",
    slogan: "Aesthetic Meets Science",
    description:
      "과학적 성분 배합과 감각적인 텍스처. 매일의 루틴을 예술로.",
    coverImage:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1600&q=80",
    logoImage: "https://placehold.co/240x80/8b7355/ffffff?text=AESTHEIN",
    accentColor: "#8b7355",
  },
  {
    handle: "giclee",
    name: "Giclee",
    slogan: "Pure from Nature",
    description:
      "자연에서 온 순수한 성분. 지속 가능한 아름다움을 위한 선택.",
    coverImage:
      "https://images.unsplash.com/photo-1522335789203-aaa6c4d4cf4d?w=1600&q=80",
    logoImage: "https://placehold.co/240x80/4a6741/ffffff?text=GICLEE",
    accentColor: "#4a6741",
  },
];
