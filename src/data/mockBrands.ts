import type { Brand } from "@/lib/types";

export type { Brand };

export const brands: Brand[] = [
  {
    handle: "sungboon-edition",
    name: "Sungboon Edition",
    slogan: {
      ko: "Brightening, Pore-Perfecting Skincare",
      en: "Brightening, Pore-Perfecting Skincare",
      zh: "焕亮肌肤，细致毛孔",
    },
    description: {
      ko: "브라이트닝과 모공 케어에 집중한 스킨케어. 메이크업 전 완벽한 피부 준비를 위한 라인.",
      en: "Skincare focused on brightening and pore care. The perfect prep for flawless makeup.",
      zh: "专注焕亮与毛孔护理的护肤系列，为完美妆容打底。",
    },
    coverImage:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1600&q=80",
    logoImage: "https://placehold.co/240x80/8b5cf6/ffffff?text=SUNGBOON",
    accentColor: "#8b5cf6",
  },
  {
    handle: "the-mute",
    name: "The Mute",
    slogan: {
      ko: "Silence in Every Drop",
      en: "Silence in Every Drop",
      zh: "每一滴皆为静谧",
    },
    description: {
      ko: "미니멀한 성분, 극대화된 효과. 불필요한 것은 모두 덜어낸 스킨케어.",
      en: "Minimal ingredients, maximum effect. Skincare stripped to the essential.",
      zh: "极简成分，极致功效。剔除一切多余，只留必要。",
    },
    coverImage:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1600&q=80",
    logoImage: "https://placehold.co/240x80/2d2d2d/ffffff?text=THE+MUTE",
    accentColor: "#2d2d2d",
  },
  {
    handle: "aesthein",
    name: "Aesthein",
    slogan: {
      ko: "Aesthetic Meets Science",
      en: "Aesthetic Meets Science",
      zh: "美学与科学的相遇",
    },
    description: {
      ko: "과학적 성분 배합과 감각적인 텍스처. 매일의 루틴을 예술로.",
      en: "Scientific formulations meet sensorial texture. Turn your routine into art.",
      zh: "科学配方与细腻肤感的结合，让每日护肤成为一种艺术。",
    },
    coverImage:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1600&q=80",
    logoImage: "https://placehold.co/240x80/8b7355/ffffff?text=AESTHEIN",
    accentColor: "#8b7355",
  },
  {
    handle: "giclee",
    name: "Giclee",
    slogan: {
      ko: "Pure from Nature",
      en: "Pure from Nature",
      zh: "源自自然的纯粹",
    },
    description: {
      ko: "자연에서 온 순수한 성분. 지속 가능한 아름다움을 위한 선택.",
      en: "Pure ingredients from nature. A choice for sustainable beauty.",
      zh: "源自自然的纯净成分，为可持续之美而生。",
    },
    coverImage:
      "https://images.unsplash.com/photo-1522335789203-aaa6c4d4cf4d?w=1600&q=80",
    logoImage: "https://placehold.co/240x80/4a6741/ffffff?text=GICLEE",
    accentColor: "#4a6741",
  },
];
