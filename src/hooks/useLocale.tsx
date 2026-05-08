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

export const LOCALES: { code: Locale; label: string; native: string }[] = [
  { code: "ko", label: "Korean", native: "한국어" },
  { code: "en", label: "English", native: "English" },
  { code: "zh", label: "Chinese", native: "中文" },
];

// 1 KRW = X (target). Used for display-only conversion from KRW base prices.
export const CURRENCIES: Record<
  Currency,
  { symbol: string; rate: number; label: string; locale: string; decimals: number }
> = {
  KRW: { symbol: "₩", rate: 1, label: "KRW", locale: "ko-KR", decimals: 0 },
  USD: { symbol: "$", rate: 1 / 1380, label: "USD", locale: "en-US", decimals: 2 },
  CAD: { symbol: "CA$", rate: 1 / 1010, label: "CAD", locale: "en-CA", decimals: 2 },
  JPY: { symbol: "¥", rate: 1 / 9.2, label: "JPY", locale: "ja-JP", decimals: 0 },
  CNY: { symbol: "¥", rate: 1 / 190, label: "CNY", locale: "zh-CN", decimals: 2 },
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
    "nav.brand": "브랜드",
    "nav.collection": "컬렉션",
    "nav.about": "About",
    "about.eyebrow": "ABOUT SELVÉ",
    "about.headline": "K-Beauty를 세계로",
    "about.subtext": "한국의 뷰티 혁신을 전 세계에 전합니다.",
    "about.brands": "우리의 브랜드",
    "about.shop": "제품 보기 →",
    "about.mission.eyebrow": "OUR MISSION",
    "about.mission.title": "아시아를 잇는 K-Beauty 브릿지",
    "about.mission.body":
      "Selvé는 K-Beauty 전문 유통사로, The Mute, Aesthein, Giclee를 포함한 한국 최고의 뷰티 브랜드를 중국, 말레이시아 등 아시아 시장에 소개합니다. TikTok 라이브 커머스, WeChat, Lazada 등 현지 채널을 통해 브랜드의 이야기를 전달합니다.",
    "about.stat1": "취급 브랜드",
    "about.stat2": "진출 국가",
    "about.stat3": "주요 유통 채널",
    "about.cta.title": "파트너십 문의",
    "about.cta.subtext": "Selvé와 함께 K-Beauty의 미래를 만들어가세요.",
    "about.cta.button": "이메일 문의하기",
  },
  en: {
    "nav.brand": "Brands",
    "nav.collection": "Collection",
    "nav.about": "About",
    "about.eyebrow": "ABOUT SELVÉ",
    "about.headline": "K-Beauty to the World",
    "about.subtext": "Bringing Korean beauty innovation to a global audience.",
    "about.brands": "Our Brands",
    "about.shop": "Shop now →",
    "about.mission.eyebrow": "OUR MISSION",
    "about.mission.title": "A K-Beauty Bridge Across Asia",
    "about.mission.body":
      "Selvé is a K-Beauty distributor introducing top Korean houses — The Mute, Aesthein, and Giclee — to Asian markets including China and Malaysia. We tell each brand's story through TikTok live commerce, WeChat, and Lazada.",
    "about.stat1": "Brands",
    "about.stat2": "Countries",
    "about.stat3": "Key Channels",
    "about.cta.title": "Partnership Inquiries",
    "about.cta.subtext": "Build the future of K-Beauty with Selvé.",
    "about.cta.button": "Contact us",
  },
  zh: {
    "nav.brand": "品牌",
    "nav.collection": "系列",
    "nav.about": "关于",
    "about.eyebrow": "关于 SELVÉ",
    "about.headline": "K-Beauty 走向世界",
    "about.subtext": "把韩国美妆创新带给全球消费者。",
    "about.brands": "我们的品牌",
    "about.shop": "查看产品 →",
    "about.mission.eyebrow": "我们的使命",
    "about.mission.title": "连接亚洲的 K-Beauty 桥梁",
    "about.mission.body":
      "Selvé 是 K-Beauty 专业分销商,将 The Mute、Aesthein、Giclee 等韩国顶级美妆品牌带入中国、马来西亚等亚洲市场。我们通过 TikTok 直播电商、微信、Lazada 等本地渠道讲述品牌故事。",
    "about.stat1": "合作品牌",
    "about.stat2": "进入国家",
    "about.stat3": "主要渠道",
    "about.cta.title": "合作咨询",
    "about.cta.subtext": "与 Selvé 共创 K-Beauty 的未来。",
    "about.cta.button": "邮件联系",
  },
};

const LOCALE_KEY = "selve_locale";
const CURRENCY_KEY = "selve_currency";

const detectInitialLocale = (): Locale => {
  if (typeof window === "undefined") return "ko";
  const m = window.location.pathname.match(/^\/(ko|en|zh)(\/|$)/);
  if (m) return m[1] as Locale;
  const saved = localStorage.getItem(LOCALE_KEY) as Locale | null;
  return saved ?? "ko";
};

const detectInitialCurrency = (): Currency => {
  if (typeof window === "undefined") return "KRW";
  const saved = localStorage.getItem(CURRENCY_KEY) as Currency | null;
  return saved ?? "KRW";
};

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ko");
  const [currency, setCurrencyState] = useState<Currency>("KRW");

  useEffect(() => {
    setLocaleState(detectInitialLocale());
    setCurrencyState(detectInitialCurrency());
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem(LOCALE_KEY, l);
    if (typeof document !== "undefined") {
      document.documentElement.lang = l;
    }
  };
  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem(CURRENCY_KEY, c);
  };

  const value = useMemo<LocaleCtx>(() => {
    const formatPrice = (krw: number) => {
      const cfg = CURRENCIES[currency];
      const value = krw * cfg.rate;
      const formatted = new Intl.NumberFormat(cfg.locale, {
        minimumFractionDigits: cfg.decimals,
        maximumFractionDigits: cfg.decimals,
      }).format(value);
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
