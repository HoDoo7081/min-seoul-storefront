import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Locale, LocalizedString } from "@/lib/types";

export type { Locale };
export type Currency = "KRW" | "USD" | "TWD" | "CNY" | "THB";

export const LOCALES: { code: Locale; label: string; native: string; flag: string }[] = [
  { code: "en",    label: "English",              native: "English", flag: "🌐" },
  { code: "zh-TW", label: "Chinese (Traditional)", native: "繁體中文", flag: "🇹🇼" },
  { code: "zh-CN", label: "Chinese (Simplified)",  native: "简体中文", flag: "🇨🇳" },
  { code: "th",    label: "Thai",                  native: "ไทย",     flag: "🇹🇭" },
];

export const CURRENCIES: Record<
  Currency,
  { symbol: string; rate: number; label: string; locale: string; decimals: number }
> = {
  KRW: { symbol: "₩",   rate: 1,        label: "KRW", locale: "ko-KR", decimals: 0 },
  USD: { symbol: "$",   rate: 1/1380,   label: "USD", locale: "en-US", decimals: 2 },
  TWD: { symbol: "NT$", rate: 1/44,     label: "TWD", locale: "zh-TW", decimals: 0 },
  CNY: { symbol: "¥",   rate: 1/190,    label: "CNY", locale: "zh-CN", decimals: 2 },
  THB: { symbol: "฿",   rate: 1/40,     label: "THB", locale: "th-TH", decimals: 0 },
};

const DEFAULT_CURRENCY_BY_LOCALE: Record<Locale, Currency> = {
  ko: "KRW", en: "USD", zh: "CNY", "zh-TW": "TWD", "zh-CN": "CNY", th: "THB",
};

type LocaleCtx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (krw: number) => string;
  t: (key: string) => string;
  /** Resolve a localized string (or plain string) for the current locale. */
  tr: (value: LocalizedString | undefined | null, fallback?: string) => string;
};

const Ctx = createContext<LocaleCtx | null>(null);

/** Resolve a LocalizedString against a locale, with sensible fallbacks. */
export function resolveLocalized(
  value: LocalizedString | undefined | null,
  locale: Locale,
  fallback = "",
): string {
  if (value == null) return fallback;
  if (typeof value === "string") return value;
  // zh-TW / zh-CN fall back to zh; th falls back to en
  const chain: Locale[] =
    locale === "zh-TW" || locale === "zh-CN"
      ? [locale, "zh", "en", "ko"]
      : locale === "th"
        ? ["th", "en", "ko"]
        : [locale, "en", "ko", "zh"];
  for (const l of chain) {
    const v = value[l];
    if (v) return v;
  }
  return value.en ?? value.ko ?? value.zh ?? fallback;
}

const dict: Partial<Record<Locale, Record<string, string>>> = {
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
    "home.story.body": "Purève Seoul은 한국 최고의 뷰티 브랜드를 중국, 말레이시아 등 아시아 시장에 소개합니다.",
    "home.story.cta": "브랜드 소개 보기",

    "pdp.addToCart": "장바구니 담기", "pdp.soldOut": "품절", "pdp.wishlist": "위시리스트에 추가",
    "pdp.reviewsLabel": "리뷰 {n}개", "pdp.related": "이 브랜드의 다른 제품",
    "pdp.notFound": "제품을 찾을 수 없습니다", "pdp.backHome": "홈으로 돌아가기 →",
    "pdp.breadcrumb.home": "홈",
    "pdp.tab.detail": "상세정보", "pdp.tab.ingredients": "성분",
    "pdp.tab.howto": "사용방법", "pdp.tab.caution": "주의사항",
    "pdp.tab.ingredients.empty": "성분 정보가 곧 업데이트됩니다.",
    "pdp.tab.howto.empty": "사용 방법 정보가 곧 업데이트됩니다.",
    "pdp.tab.caution.empty": "특별한 주의사항이 없습니다.",
    "pdp.added": "✓ 담겼습니다", "pdp.viewFull": "상세 페이지 보기 →",

    "review.title": "고객 리뷰", "review.totalLabel": "총 {n}개의 리뷰",
    "review.more": "리뷰 더보기",

    "cart.title": "장바구니", "cart.count": "{n}개의 상품",
    "cart.subtotal": "소계", "cart.shipping": "배송비",
    "cart.free": "무료", "cart.total": "총 주문금액",
    "cart.checkout": "결제하기", "cart.continue": "쇼핑 계속하기",
    "cart.summary": "주문 요약", "cart.empty": "장바구니가 비었습니다",
    "cart.empty.sub": "마음에 드는 제품을 담아보세요", "cart.empty.cta": "쇼핑 시작하기",
    "cart.free.threshold": "₩50,000 이상 무료배송",
    "cart.freeRemain": "{amount} 더 담으면 무료배송!",
    "cart.delete": "삭제",
    "cart.drawer.empty": "장바구니가 비어 있습니다",
    "cart.drawer.subtotal": "합계",
    "cart.drawer.note": "배송비는 결제 단계에서 계산됩니다.",

    "coll.cat.all": "전체", "coll.cat.serum": "세럼", "coll.cat.cream": "크림",
    "coll.cat.toner": "토너", "coll.cat.sun": "선케어", "coll.cat.body": "바디",
    "coll.sort.latest": "최신순", "coll.sort.price-asc": "가격 낮은순",
    "coll.sort.price-desc": "가격 높은순", "coll.sort.popular": "인기순",
    "coll.count": "{n}개의 제품", "coll.empty": "해당 카테고리의 제품이 없습니다",
    "coll.viewAll": "전체 보기", "coll.more": "더 보기 ({n}개 남음)",
    "coll.allBrands": "All Brands", "coll.allBrands.sub": "Purève Seoul의 모든 브랜드를 만나보세요",

    "about.eyebrow": "ABOUT PURÈVE SEOUL", "about.headline": "K-Beauty를 세계로", "about.subtext": "한국의 뷰티 혁신을 전 세계에 전합니다.",
    "about.brands": "우리의 브랜드", "about.shop": "제품 보기 →",
    "about.mission.eyebrow": "OUR MISSION", "about.mission.title": "아시아를 잇는 K-Beauty 브릿지",
    "about.mission.body": "Purève Seoul는 K-Beauty 전문 유통사로, The Mute, Aesthein, Giclee를 포함한 한국 최고의 뷰티 브랜드를 중국, 말레이시아 등 아시아 시장에 소개합니다.",
    "about.stat1": "취급 브랜드", "about.stat2": "진출 국가", "about.stat3": "주요 유통 채널",
    "about.cta.title": "파트너십 문의", "about.cta.subtext": "Purève Seoul와 함께 K-Beauty의 미래를 만들어가세요.", "about.cta.button": "이메일 문의하기",

    "footer.tagline": "Bringing K-Beauty to the World",
    "footer.support": "고객센터", "footer.email": "이메일",
    "footer.hours": "운영시간: 평일 10:00–18:00 (KST)",
    "footer.social": "소셜미디어",
    "footer.terms": "이용약관", "footer.privacy": "개인정보처리방침", "footer.business": "사업자정보",

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
    "home.story.body": "Purève Seoul introduces Korea's finest beauty brands to China, Malaysia, and across Asia.",
    "home.story.cta": "Our Story",

    "pdp.addToCart": "Add to Cart", "pdp.soldOut": "Sold Out", "pdp.wishlist": "Add to Wishlist",
    "pdp.reviewsLabel": "{n} reviews", "pdp.related": "More from this brand",
    "pdp.notFound": "Product not found", "pdp.backHome": "Back to home →",
    "pdp.breadcrumb.home": "Home",
    "pdp.tab.detail": "Details", "pdp.tab.ingredients": "Ingredients",
    "pdp.tab.howto": "How to Use", "pdp.tab.caution": "Caution",
    "pdp.tab.ingredients.empty": "Ingredient info coming soon.",
    "pdp.tab.howto.empty": "Usage info coming soon.",
    "pdp.tab.caution.empty": "No special precautions.",
    "pdp.added": "✓ Added", "pdp.viewFull": "View full details →",

    "review.title": "Customer Reviews", "review.totalLabel": "{n} reviews total",
    "review.more": "Load more reviews",

    "cart.title": "Shopping Bag", "cart.count": "{n} items",
    "cart.subtotal": "Subtotal", "cart.shipping": "Shipping",
    "cart.free": "Free", "cart.total": "Order Total",
    "cart.checkout": "Checkout", "cart.continue": "Continue Shopping",
    "cart.summary": "Order Summary", "cart.empty": "Your bag is empty",
    "cart.empty.sub": "Find something you love", "cart.empty.cta": "Start Shopping",
    "cart.free.threshold": "Free shipping over ₩50,000",
    "cart.freeRemain": "Add {amount} more for free shipping!",
    "cart.delete": "Remove",
    "cart.drawer.empty": "Your cart is empty",
    "cart.drawer.subtotal": "Subtotal",
    "cart.drawer.note": "Shipping calculated at checkout.",

    "coll.cat.all": "All", "coll.cat.serum": "Serum", "coll.cat.cream": "Cream",
    "coll.cat.toner": "Toner", "coll.cat.sun": "Sun Care", "coll.cat.body": "Body",
    "coll.sort.latest": "Newest", "coll.sort.price-asc": "Price: Low to High",
    "coll.sort.price-desc": "Price: High to Low", "coll.sort.popular": "Most Popular",
    "coll.count": "{n} products", "coll.empty": "No products in this category",
    "coll.viewAll": "View All", "coll.more": "Load more ({n} left)",
    "coll.allBrands": "All Brands", "coll.allBrands.sub": "Explore every brand at Purève Seoul",

    "about.eyebrow": "ABOUT PURÈVE SEOUL", "about.headline": "K-Beauty to the World", "about.subtext": "Bringing Korean beauty innovation to a global audience.",
    "about.brands": "Our Brands", "about.shop": "Shop now →",
    "about.mission.eyebrow": "OUR MISSION", "about.mission.title": "A K-Beauty Bridge Across Asia",
    "about.mission.body": "Purève Seoul is a K-Beauty distributor introducing top Korean houses — The Mute, Aesthein, and Giclee — to Asian markets including China and Malaysia.",
    "about.stat1": "Brands", "about.stat2": "Countries", "about.stat3": "Key Channels",
    "about.cta.title": "Partnership Inquiries", "about.cta.subtext": "Build the future of K-Beauty with Purève Seoul.", "about.cta.button": "Contact us",

    "footer.tagline": "Bringing K-Beauty to the World",
    "footer.support": "Support", "footer.email": "Email",
    "footer.hours": "Hours: Weekdays 10:00–18:00 (KST)",
    "footer.social": "Social",
    "footer.terms": "Terms", "footer.privacy": "Privacy Policy", "footer.business": "Business Info",

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
    "home.story.body": "Purève Seoul 将韩国顶级美妆品牌带入中国、马来西亚等亚洲市场。",
    "home.story.cta": "了解更多",

    "pdp.addToCart": "加入购物车", "pdp.soldOut": "售罄", "pdp.wishlist": "加入心愿单",
    "pdp.reviewsLabel": "{n} 条评价", "pdp.related": "同品牌其他产品",
    "pdp.notFound": "未找到该产品", "pdp.backHome": "返回首页 →",
    "pdp.breadcrumb.home": "首页",
    "pdp.tab.detail": "产品详情", "pdp.tab.ingredients": "成分表",
    "pdp.tab.howto": "使用方法", "pdp.tab.caution": "注意事项",
    "pdp.tab.ingredients.empty": "成分信息即将更新。",
    "pdp.tab.howto.empty": "使用方法即将更新。",
    "pdp.tab.caution.empty": "无特殊注意事项。",
    "pdp.added": "✓ 已加入",

    "review.title": "顾客评价", "review.totalLabel": "共 {n} 条评价",
    "review.more": "查看更多评价",

    "cart.title": "购物袋", "cart.count": "{n} 件商品",
    "cart.subtotal": "小计", "cart.shipping": "运费",
    "cart.free": "免费", "cart.total": "订单总额",
    "cart.checkout": "去结算", "cart.continue": "继续购物",
    "cart.summary": "订单摘要", "cart.empty": "购物袋是空的",
    "cart.empty.sub": "找到您喜欢的产品吧", "cart.empty.cta": "开始购物",
    "cart.free.threshold": "满₩50,000免运费",
    "cart.freeRemain": "再加 {amount} 即可免运费！",
    "cart.delete": "删除",
    "cart.drawer.empty": "购物车是空的",
    "cart.drawer.subtotal": "小计",
    "cart.drawer.note": "运费将在结算时计算。",

    "coll.cat.all": "全部", "coll.cat.serum": "精华", "coll.cat.cream": "面霜",
    "coll.cat.toner": "爽肤水", "coll.cat.sun": "防晒", "coll.cat.body": "身体护理",
    "coll.sort.latest": "最新", "coll.sort.price-asc": "价格从低到高",
    "coll.sort.price-desc": "价格从高到低", "coll.sort.popular": "最受欢迎",
    "coll.count": "{n} 件商品", "coll.empty": "该分类暂无商品",
    "coll.viewAll": "查看全部", "coll.more": "加载更多 (剩 {n})",
    "coll.allBrands": "全部品牌", "coll.allBrands.sub": "探索 Purève Seoul 的全部品牌",

    "about.eyebrow": "关于 PURÈVE SEOUL", "about.headline": "K-Beauty 走向世界", "about.subtext": "把韩国美妆创新带给全球消费者。",
    "about.brands": "我们的品牌", "about.shop": "查看产品 →",
    "about.mission.eyebrow": "我们的使命", "about.mission.title": "连接亚洲的 K-Beauty 桥梁",
    "about.mission.body": "Purève Seoul 是 K-Beauty 专业分销商，将 The Mute、Aesthein、Giclee 等韩国顶级美妆品牌带入中国、马来西亚等亚洲市场。",
    "about.stat1": "合作品牌", "about.stat2": "进入国家", "about.stat3": "主要渠道",
    "about.cta.title": "合作咨询", "about.cta.subtext": "与 Purève Seoul 共创 K-Beauty 的未来。", "about.cta.button": "邮件联系",

    "footer.tagline": "把 K-Beauty 带给世界",
    "footer.support": "客户服务", "footer.email": "邮箱",
    "footer.hours": "营业时间: 工作日 10:00–18:00 (KST)",
    "footer.social": "社交媒体",
    "footer.terms": "使用条款", "footer.privacy": "隐私政策", "footer.business": "公司信息",

    "i18n.language": "语言", "i18n.currency": "货币", "i18n.allLang": "所有语言", "i18n.mainCur": "主要货币", "i18n.allCur": "所有货币",
  },
};

// Aliases: Traditional & Simplified Chinese reuse the zh dict for now
dict["zh-CN"] = dict.zh;
dict["zh-TW"] = dict.zh;
// Thai: minimal set — falls back to English via the t() chain below
dict.th = {
  "nav.brand": "แบรนด์", "nav.collection": "คอลเลกชัน", "nav.about": "เกี่ยวกับ", "nav.view": "ช้อปเลย →",
  "hero.cta": "ช้อปเลย",
  "home.brands.title": "แบรนด์ของเรา", "home.brands.link": "ดูคอลเลกชัน →",
  "home.best.title": "สินค้าขายดี", "home.best.link": "ดูทั้งหมด →",
  "home.new.title": "สินค้าใหม่", "home.new.sub": "พบกับสินค้าล่าสุดของเรา",
  "home.story.eyebrow": "เรื่องราวของเรา", "home.story.title": "K-Beauty สู่ทั่วโลก",
  "home.story.body": "Purève Seoul นำแบรนด์ความงามชั้นนำของเกาหลีสู่ตลาดจีน มาเลเซีย และเอเชีย",
  "home.story.cta": "เรื่องราวของเรา",
  "pdp.addToCart": "หยิบใส่ตะกร้า", "pdp.soldOut": "สินค้าหมด", "pdp.wishlist": "เพิ่มในรายการโปรด",
  "pdp.reviewsLabel": "{n} รีวิว", "pdp.related": "สินค้าอื่นจากแบรนด์นี้",
  "pdp.notFound": "ไม่พบสินค้า", "pdp.backHome": "กลับหน้าหลัก →",
  "pdp.breadcrumb.home": "หน้าแรก",
  "pdp.added": "✓ เพิ่มแล้ว",
  "cart.title": "ตะกร้าสินค้า", "cart.count": "{n} รายการ",
  "cart.subtotal": "รวม", "cart.shipping": "ค่าจัดส่ง",
  "cart.free": "ฟรี", "cart.total": "ยอดรวมทั้งหมด",
  "cart.checkout": "ชำระเงิน", "cart.continue": "ช้อปต่อ",
  "cart.summary": "สรุปคำสั่งซื้อ", "cart.empty": "ตะกร้าของคุณว่างเปล่า",
  "cart.empty.sub": "ค้นหาสินค้าที่คุณชอบ", "cart.empty.cta": "เริ่มช้อป",
  "cart.delete": "ลบ",
  "cart.drawer.empty": "ตะกร้าของคุณว่างเปล่า",
  "cart.drawer.subtotal": "รวม",
  "cart.drawer.note": "คำนวณค่าจัดส่งเมื่อชำระเงิน",
  "coll.cat.all": "ทั้งหมด",
  "coll.count": "{n} รายการ", "coll.empty": "ไม่มีสินค้าในหมวดหมู่นี้",
  "coll.viewAll": "ดูทั้งหมด", "coll.more": "โหลดเพิ่ม (เหลือ {n})",
  "coll.allBrands": "แบรนด์ทั้งหมด",
  "i18n.language": "ภาษา", "i18n.currency": "สกุลเงิน",
};

const LOCALE_KEY   = "selve_locale";
const CURRENCY_KEY = "selve_currency";

const detectInitialLocale = (): Locale => {
  if (typeof window === "undefined") return "en";
  return (localStorage.getItem(LOCALE_KEY) as Locale) ?? "en";
};
const detectInitialCurrency = (): Currency => {
  if (typeof window === "undefined") return "USD";
  return (localStorage.getItem(CURRENCY_KEY) as Currency) ?? "USD";
};

function interpolate(s: string, vars?: Record<string, string | number>) {
  if (!vars) return s;
  return s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale,   setLocaleState]   = useState<Locale>("en");
  const [currency, setCurrencyState] = useState<Currency>("USD");

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
    const t = (key: string) => dict[locale]?.[key] ?? dict.en?.[key] ?? dict.ko?.[key] ?? key;
    const tr = (val: LocalizedString | undefined | null, fallback = "") =>
      resolveLocalized(val, locale, fallback);
    return { locale, setLocale, currency, setCurrency, formatPrice, t, tr };
  }, [locale, currency]);

  // Re-export helper so callers can use t with interpolation.
  (value as unknown as { ti: typeof interpolate }).ti = interpolate;

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLocale() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

/** Helper: substitute {name}-style placeholders. */
export const tInterpolate = interpolate;
