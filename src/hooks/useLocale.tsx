import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "ko" | "en" | "zh";
export type Currency = "KRW" | "USD" | "CAD" | "JPY" | "CNY";

export const LOCALES: { code: Locale; label: string; native: string; flag: string }[] = [
  { code: "ko", label: "Korean",  native: "한국어",  flag: "🇰🇷" },
  { code: "en", label: "English", native: "English", flag: "🌐" },
  { code: "zh", label: "Chinese", native: "中文",    flag: "🇨🇳" },
];

export const CURRENCIES: Record<
  Currency,
  { symbol: string; rate: number; label: string; locale: string; decimals: number }
> = {
  KRW: { symbol: "₩",   rate: 1,       label: "KRW", locale: "ko-KR", decimals: 0 },
  USD: { symbol: "$",   rate: 1/1380,   label: "USD", locale: "en-US", decimals: 2 },
  CAD: { symbol: "CA$", rate: 1/1010,   label: "CAD", locale: "en-CA", decimals: 2 },
  JPY: { symbol: "¥",   rate: 1/9.2,    label: "JPY", locale: "ja-JP", decimals: 0 },
  CNY: { symbol: "¥",   rate: 1/190,    label: "CNY", locale: "zh-CN", decimals: 2 },
};

type LocaleCtx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (krw: number) => string;
  t: (key: string) => string;
};

const Ctx = createContext<LocaleCtx | null>(null);

const dict: Record<Locale, Record<string, string>> = {
  ko: {
    "nav.brand": "브랜드", "nav.collection": "컬렉션", "nav.about": "About", "nav.view": "보러가기 →",
    "hero.0.brand": "Giclee", "hero.0.title": "Pure K-Beauty", "hero.0.subtitle": "자연에서 온 순수함, 매일의 루틴으로.",
    "hero.1.brand": "The Mute", "hero.1.title": "The Mute", "hero.1.subtitle": "미니멀한 스킨케어의 완성.",
    "hero.2.brand": "Aesthein", "hero.2.title": "New Arrivals", "hero.2.subtitle": "새로운 시즌, 새로운 루틴.",
    "hero.cta": "지금 쇼핑하기",
    "home.brands.title": "Our Brands", "home.brands.link": "컬렉션 보기 →",
    "home.best.title": "베스트셀러", "home.best.link": "전체보기 →",
    "home.new.title": "신제품", "home.new.sub": "새롭게 출시된 제품을 만나보세요",
    "home.story.eyebrow": "OUR STORY", "home.story.title": "K-Beauty를 세계로",
    "home.story.body": "Selvé은 한국 최고의 뷰티 브랜드를 중국, 말레이시아 등 아시아 시장에 소개합니다.",
    "home.story.cta": "브랜드 소개 보기",
    "pdp.addToCart": "장바구니 담기", "pdp.soldOut": "품절", "pdp.wishlist": "위시리스트에 추가",
    "pdp.reviews": "개", "pdp.related": "이 브랜드의 다른 제품",
    "pdp.tab.detail": "상세정보", "pdp.tab.ingredients": "성분", "pdp.tab.howto": "사용방법", "pdp.tab.caution": "주의사항",
    "cart.title": "장바구니", "cart.count": "개의 상품", "cart.subtotal": "소계",
    "cart.shipping": "배송비", "cart.free": "무료", "cart.total": "총 주문금액",
    "cart.checkout": "결제하기", "cart.continue": "쇼핑 계속하기",
    "cart.empty": "장바구니가 비었습니다", "cart.empty.sub": "마음에 드는 제품을 담아보세요", "cart.empty.cta": "쇼핑 시작하기",
    "cart.free.threshold": "₩50,000 이상 무료배송",
    "about.eyebrow": "ABOUT SELVÉ", "about.headline": "K-Beauty를 세계로", "about.subtext": "한국의 뷰티 혁신을 전 세계에 전합니다.",
    "about.brands": "우리의 브랜드", "about.shop": "제품 보기 →",
    "about.mission.eyebrow": "OUR MISSION", "about.mission.title": "아시아를 잇는 K-Beauty 브릿지",
    "about.mission.body": "Selvé는 K-Beauty 전문 유통사로, The Mute, Aesthein, Giclee를 포함한 한국 최고의 뷰티 브랜드를 중국, 말레이시아 등 아시아 시장에 소개합니다.",
    "about.stat1": "취급 브랜드", "about.stat2": "진출 국가", "about.stat3": "주요 유통 채널",
    "about.cta.title": "파트너십 문의", "about.cta.subtext": "Selvé와 함께 K-Beauty의 미래를 만들어가세요.", "about.cta.button": "이메일 문의하기",
    "i18n.language": "언어", "i18n.currency": "통화", "i18n.allLang": "모든 언어", "i18n.mainCur": "주요 통화", "i18n.allCur": "모든 통화",
  },
  en: {
    "nav.brand": "Brands", "nav.collection": "Collection", "nav.about": "About", "nav.view": "Shop now →",
    "hero.0.brand": "Giclee", "hero.0.title": "Pure K-Beauty", "hero.0.subtitle": "Pure ingredients, your daily ritual.",
    "hero.1.brand": "The Mute", "hero.1.title": "The Mute", "hero.1.subtitle": "Minimal skincare, maximum effect.",
    "hero.2.brand": "Aesthein", "hero.2.title": "New Arrivals", "hero.2.subtitle": "A new season, a new routine.",
    "hero.cta": "Shop Now",
    "home.brands.title": "Our Brands", "home.brands.link": "View collection →",
    "home.best.title": "Best Sellers", "home.best.link": "View all →",
    "home.new.title": "New Arrivals", "home.new.sub": "Discover our latest launches",
    "home.story.eyebrow": "OUR STORY", "home.story.title": "K-Beauty to the World",
    "home.story.body": "Selvé introduces Korea's finest beauty brands to China, Malaysia, and across Asia.",
    "home.story.cta": "Our Story",
    "pdp.addToCart": "Add to Cart", "pdp.soldOut": "Sold Out", "pdp.wishlist": "Add to Wishlist",
    "pdp.reviews": " reviews", "pdp.related": "More from this brand",
    "pdp.tab.detail": "Details", "pdp.tab.ingredients": "Ingredients", "pdp.tab.howto": "How to Use", "pdp.tab.caution": "Caution",
    "cart.title": "Shopping Bag", "cart.count": " items", "cart.subtotal": "Subtotal",
    "cart.shipping": "Shipping", "cart.free": "Free", "cart.total": "Order Total",
    "cart.checkout": "Checkout", "cart.continue": "Continue Shopping",
    "cart.empty": "Your bag is empty", "cart.empty.sub": "Find something you love", "cart.empty.cta": "Start Shopping",
    "cart.free.threshold": "Free shipping over ₩50,000",
    "about.eyebrow": "ABOUT SELVÉ", "about.headline": "K-Beauty to the World", "about.subtext": "Bringing Korean beauty innovation to a global audience.",
    "about.brands": "Our Brands", "about.shop": "Shop now →",
    "about.mission.eyebrow": "OUR MISSION", "about.mission.title": "A K-Beauty Bridge Across Asia",
    "about.mission.body": "Selvé is a K-Beauty distributor introducing top Korean houses — The Mute, Aesthein, and Giclee — to Asian markets including China and Malaysia.",
    "about.stat1": "Brands", "about.stat2": "Countries", "about.stat3": "Key Channels",
    "about.cta.title": "Partnership Inquiries", "about.cta.subtext": "Build the future of K-Beauty with Selvé.", "about.cta.button": "Contact us",
    "i18n.language": "Language", "i18n.currency": "Currency", "i18n.allLang": "All Languages", "i18n.mainCur": "Main Currencies", "i18n.allCur": "All Currencies",
  },
  zh: {
    "nav.brand": "品牌", "nav.collection": "系列", "nav.about": "关于", "nav.view": "查看产品 →",
    "hero.0.brand": "Giclee", "hero.0.title": "纯粹 K-Beauty", "hero.0.subtitle": "源自自然的纯粹，融入日常护肤。",
    "hero.1.brand": "The Mute", "hero.1.title": "The Mute", "hero.1.subtitle": "极简护肤，极致效果。",
    "hero.2.brand": "Aesthein", "hero.2.title": "新品上市", "hero.2.subtitle": "新季节，新护肤程序。",
    "hero.cta": "立即购买",
    "home.brands.title": "我们的品牌", "home.brands.link": "查看系列 →",
    "home.best.title": "热销商品", "home.best.link": "查看全部 →",
    "home.new.title": "新品", "home.new.sub": "探索最新上市产品",
    "home.story.eyebrow": "品牌故事", "home.story.title": "K-Beauty 走向世界",
    "home.story.body": "Selvé 将韩国顶级美妆品牌带入中国、马来西亚等亚洲市场。",
    "home.story.cta": "了解更多",
    "pdp.addToCart": "加入购物车", "pdp.soldOut": "售罄", "pdp.wishlist": "加入心愿单",
    "pdp.reviews": " 条评价", "pdp.related": "同品牌其他产品",
    "pdp.tab.detail": "产品详情", "pdp.tab.ingredients": "成分表", "pdp.tab.howto": "使用方法", "pdp.tab.caution": "注意事项",
    "cart.title": "购物袋", "cart.count": " 件商品", "cart.subtotal": "小计",
    "cart.shipping": "运费", "cart.free": "免费", "cart.total": "订单总额",
    "cart.checkout": "去结算", "cart.continue": "继续购物",
    "cart.empty": "购物袋是空的", "cart.empty.sub": "找到您喜欢的产品吧", "cart.empty.cta": "开始购物",
    "cart.free.threshold": "满₩50,000免运费",
    "about.eyebrow": "关于 SELVÉ", "about.headline": "K-Beauty 走向世界", "about.subtext": "把韩国美妆创新带给全球消费者。",
    "about.brands": "我们的品牌", "about.shop": "查看产品 →",
    "about.mission.eyebrow": "我们的使命", "about.mission.title": "连接亚洲的 K-Beauty 桥梁",
    "about.mission.body": "Selvé 是 K-Beauty 专业分销商，将 The Mute、Aesthein、Giclee 等韩国顶级美妆品牌带入中国、马来西亚等亚洲市场。",
    "about.stat1": "合作品牌", "about.stat2": "进入国家", "about.stat3": "主要渠道",
    "about.cta.title": "合作咨询", "about.cta.subtext": "与 Selvé 共创 K-Beauty 的未来。", "about.cta.button": "邮件联系",
    "i18n.language": "语言", "i18n.currency": "货币", "i18n.allLang": "所有语言", "i18n.mainCur": "主要货币", "i18n.allCur": "所有货币",
  },
};

const LOCALE_KEY   = "selve_locale";
const CURRENCY_KEY = "selve_currency";

const detectInitialLocale = (): Locale => {
  if (typeof window === "undefined") return "ko";
  return (localStorage.getItem(LOCALE_KEY) as Locale) ?? "ko";
};
const detectInitialCurrency = (): Currency => {
  if (typeof window === "undefined") return "KRW";
  return (localStorage.getItem(CURRENCY_KEY) as Currency) ?? "KRW";
};

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale,   setLocaleState]   = useState<Locale>("ko");
  const [currency, setCurrencyState] = useState<Currency>("KRW");

  useEffect(() => {
    setLocaleState(detectInitialLocale());
    setCurrencyState(detectInitialCurrency());
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem(LOCALE_KEY, l);
    if (typeof document !== "undefined") document.documentElement.lang = l;
  };
  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem(CURRENCY_KEY, c);
  };

  const value = useMemo<LocaleCtx>(() => {
    const formatPrice = (krw: number) => {
      const cfg = CURRENCIES[currency];
      const formatted = new Intl.NumberFormat(cfg.locale, {
        minimumFractionDigits: cfg.decimals,
        maximumFractionDigits: cfg.decimals,
      }).format(krw * cfg.rate);
      return `${cfg.symbol}${formatted}`;
    };
    const t = (key: string) => dict[locale][key] ?? dict.ko[key] ?? key;
    return { locale, setLocale, currency, setCurrency, formatPrice, t };
  }, [locale, currency]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLocale() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
