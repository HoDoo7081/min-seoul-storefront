import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Locale, LocalizedString } from "@/lib/types";
import { translatePdp } from "@/lib/pdpDictionary";

export type { Locale };
export type Currency = "KRW" | "USD" | "TWD" | "CNY" | "THB";

export const LOCALES: { code: Locale; label: string; native: string; flag: string }[] = [
  { code: "en",    label: "English",               native: "English",   flag: "🌐" },
  { code: "zh-TW", label: "Chinese (Traditional)", native: "繁體中文", flag: "🇹🇼" },
  { code: "zh-CN", label: "Chinese (Simplified)",  native: "简体中文", flag: "🇨🇳" },
  { code: "th",    label: "Thai",                  native: "ไทย",       flag: "🇹🇭" },
];

export const CURRENCIES: Record<
  Currency,
  { symbol: string; rate: number; label: string; locale: string; decimals: number }
> = {
  KRW: { symbol: "₩",   rate: 1,      label: "KRW", locale: "ko-KR", decimals: 0 },
  USD: { symbol: "$",   rate: 1/1380, label: "USD", locale: "en-US", decimals: 2 },
  TWD: { symbol: "NT$", rate: 1/44,   label: "TWD", locale: "zh-TW", decimals: 0 },
  CNY: { symbol: "¥",   rate: 1/190,  label: "CNY", locale: "zh-CN", decimals: 2 },
  THB: { symbol: "฿",   rate: 1/40,   label: "THB", locale: "th-TH", decimals: 0 },
};

type LocaleCtx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (krw: number) => string;
  t: (key: string) => string;
  tt: (en: string) => string;
  tr: (value: LocalizedString | undefined | null, fallback?: string) => string;
};

const Ctx = createContext<LocaleCtx | null>(null);

/** Resolve a LocalizedString with sensible fallbacks. */
export function resolveLocalized(
  value: LocalizedString | undefined | null,
  locale: Locale,
  fallback = "",
): string {
  if (value == null) return fallback;
  if (typeof value === "string") return maybeAutoTranslate(value, locale);
  const chain: Locale[] =
    locale === "zh-TW" || locale === "zh-CN"
      ? [locale, "zh", "en", "ko"]
      : locale === "th"
        ? ["th", "en", "ko"]
        : locale === "zh"
          ? ["zh", "zh-CN", "en", "ko"]
          : [locale, "en", "ko", "zh"];
  for (const l of chain) {
    const v = value[l];
    if (v) {
      // If we had to fall back to en/ko for a non-en/ko locale,
      // try the PDP dictionary to translate the string.
      if (l !== locale && (locale !== "en" && locale !== "ko")) {
        return translatePdp(v, locale);
      }
      return v;
    }
  }
  const finalVal = value.en ?? value.ko ?? value.zh ?? fallback;
  return maybeAutoTranslate(finalVal, locale);
}

function maybeAutoTranslate(v: string, locale: Locale): string {
  if (!v) return v;
  if (locale === "en" || locale === "ko") return v;
  return translatePdp(v, locale);
}


// ────────── Dictionaries ──────────
// All keys used across the app. Each locale is complete.

const en: Record<string, string> = {
  // nav
  "nav.menu": "Menu", "nav.search": "Search", "nav.account": "Account", "nav.cart": "Cart",
  "nav.myAccount": "My Account", "nav.signOut": "Sign Out",
  "nav.products": "Products", "nav.about": "About", "nav.contact": "Contact",
  "nav.brand": "Brands", "nav.collection": "Collection", "nav.view": "Shop now →",
  // menu overlay
  "menu.close": "Close", "menu.homeProducts": "Home\nProducts", "menu.shopNow": "Shop Now ›",
  // common
  "common.home": "Home", "common.processing": "Processing...", "common.loading": "Loading...",
  "common.buyNow": "Buy It Now", "common.price": "Price",
  // announcement
  "announcement.0": "🎉 Early Bird: ₩2,000 off until July 15 — use code EARLYBIRD at checkout",
  "announcement.1": "Three K-Beauty houses, one destination — Min Seoul",
  "announcement.2": "New arrival 🌿 Giclee Rosehip Oil",
  // hero panels (home)
  "home.hero.0.title": "All-Skin Anti-Aging Line",
  "home.hero.0.subtitle": "Care for all skin types, with anti-aging benefits.",
  "home.hero.1.title": "Ectoin Barrier Line",
  "home.hero.1.subtitle": "Long-lasting hydration that prevents water loss.",
  "home.hero.2.title": "Tea Tree Toner",
  "home.hero.2.subtitle": "Instantly lowers skin temperature by 2.63°C and controls excess sebum.",
  "home.hero.3.title": "SUNGBOON EDITION Skincare Line",
  "home.hero.3.subtitle": "Brightening, pore-minimizing, and perfect for makeup prep.",
  // home category cards
  "home.cat.skincare": "Skincare", "home.cat.sets": "Sets",
  // home about block
  "home.about.tag": "About",
  "home.about.headline": "At Min Seoul, we believe great skin isn't about following trends. It's about understanding how skin actually works — and choosing products that respect that.",
  "home.about.cta": "More About Min Seoul",
  // home brands / best / new
  "home.brands.title": "Our Brands", "home.brands.link": "View collection →",
  "home.best.title": "Best Sellers", "home.best.link": "View all →",
  "home.new.title": "New Arrivals", "home.new.sub": "Discover our latest launches",
  "home.story.eyebrow": "OUR STORY", "home.story.title": "K-Beauty to the World",
  "home.story.body": "Min Seoul introduces Korea's finest beauty brands to China, Malaysia, and across Asia.",
  "home.story.cta": "Our Story",
  // hero (legacy)
  "hero.0.brand": "Giclee", "hero.0.title": "Pure K-Beauty", "hero.0.subtitle": "Pure ingredients, your daily ritual.",
  "hero.1.brand": "The Mute", "hero.1.title": "The Mute", "hero.1.subtitle": "Minimal skincare, maximum effect.",
  "hero.2.brand": "Aesthein", "hero.2.title": "New Arrivals", "hero.2.subtitle": "A new season, a new routine.",
  "hero.cta": "Shop Now",
  // PDP
  "pdp.addToCart": "Add to Cart", "pdp.soldOut": "Sold Out", "pdp.wishlist": "Add to Wishlist",
  "pdp.reviewsLabel": "{n} reviews", "pdp.related": "More from this brand",
  "pdp.notFound": "Product not available",
  "pdp.notFound.sub": "We couldn't load this product. Please try again.",
  "pdp.retry": "Try Again", "pdp.backToProducts": "Back to Products",
  "pdp.backHome": "Back to home →",
  "pdp.breadcrumb.home": "Home", "pdp.breadcrumb.products": "Products",
  "pdp.tab.detail": "Details", "pdp.tab.ingredients": "Ingredients",
  "pdp.tab.howto": "How to Use", "pdp.tab.caution": "Caution",
  "pdp.tab.ingredients.empty": "Ingredient info coming soon.",
  "pdp.tab.howto.empty": "Usage info coming soon.",
  "pdp.tab.caution.empty": "No special precautions.",
  "pdp.added": "✓ Added", "pdp.viewFull": "View full details →",
  "pdp.mainIngredients": "Main Ingredients",
  "pdp.option": "Option",
  // reviews
  "review.title": "Customer Reviews", "review.totalLabel": "{n} reviews total",
  "review.more": "Load more reviews",
  // cart
  "cart.title": "Shopping Bag", "cart.count": "{n} items",
  "cart.subtotal": "Subtotal", "cart.shipping": "Shipping",
  "cart.free": "Free", "cart.total": "Order Total",
  "cart.checkout": "Checkout", "cart.continue": "Continue Shopping",
  "cart.summary": "Order Summary", "cart.empty": "Your bag is empty",
  "cart.empty.sub": "Find something you love", "cart.empty.cta": "Start Shopping",
  "cart.free.threshold": "Free shipping over ₩50,000",
  "cart.freeRemain": "Add {amount} more for free shipping!",
  "cart.delete": "Remove", "cart.remove": "Remove",
  "cart.drawer.empty": "Your cart is empty",
  "cart.drawer.subtotal": "Subtotal",
  "cart.drawer.note": "Shipping calculated at checkout.",
  "cart.secureNote": "Secure checkout · Free returns within 30 days",
  "cart.unable": "Unable to open checkout. Please try again.",
  "cart.error": "Something went wrong. Please try again.",
  // collection
  "coll.cat.skincare": "Skincare", "coll.cat.sets": "Sets", "coll.cat.all": "All",
  "coll.showing": "Showing {n} of {total} products",
  "coll.storeUnavailable": "Store temporarily unavailable",
  "coll.storeUnavailable.sub": "We're having trouble connecting to our store. Please try again in a moment.",
  "coll.tryAgain": "Try Again",
  "coll.noProducts": "No products found",
  "coll.noProducts.sub": "Add products through your Shopify admin and they will appear here automatically.",
  "coll.count": "{n} products", "coll.empty": "No products in this category",
  "coll.viewAll": "View All", "coll.more": "Load more ({n} left)",
  "coll.allBrands": "All Brands", "coll.allBrands.sub": "Explore every brand at Min Seoul",
  // about page
  "about.eyebrow": "ABOUT MIN SEOUL", "about.headline": "K-Beauty to the World",
  "about.subtext": "Bringing Korean beauty innovation to a global audience.",
  "about.brands": "Our Brands", "about.shop": "Shop now →",
  "about.mission.eyebrow": "OUR MISSION", "about.mission.title": "A K-Beauty Bridge Across Asia",
  "about.mission.body": "Min Seoul is a K-Beauty distributor introducing top Korean houses — The Mute, Aesthein, and Giclee — to Asian markets including China and Malaysia.",
  "about.stat1": "Brands", "about.stat2": "Countries", "about.stat3": "Key Channels",
  "about.cta.title": "Partnership Inquiries",
  "about.cta.subtext": "Build the future of K-Beauty with Min Seoul.",
  "about.cta.button": "Contact us",
  // footer
  "footer.tagline": "Bringing K-Beauty to the World",
  "footer.support": "Support", "footer.email": "Email",
  "footer.hours": "Hours: Weekdays 10:00–18:00 (KST)",
  "footer.social": "Social",
  "footer.terms": "Terms", "footer.privacy": "Privacy Policy", "footer.business": "Business Info",
  "footer.copyright": "© 2026 Min Seoul. All rights reserved.",
  // switcher
  "i18n.language": "Language", "i18n.currency": "Currency",
  "pdp.pillar.daily": "Daily Skin Care", "pdp.pillar.targeted": "Targeted Benefits", "pdp.pillar.trusted": "Trusted Formula",
};

const zhTW: Record<string, string> = {
  "nav.menu": "選單", "nav.search": "搜尋", "nav.account": "會員", "nav.cart": "購物袋",
  "nav.myAccount": "我的帳戶", "nav.signOut": "登出",
  "nav.products": "商品", "nav.about": "關於", "nav.contact": "聯絡我們",
  "nav.brand": "品牌", "nav.collection": "系列", "nav.view": "立即選購 →",
  "menu.close": "關閉", "menu.homeProducts": "首頁\n商品", "menu.shopNow": "立即選購 ›",
  "common.home": "首頁", "common.processing": "處理中...", "common.loading": "載入中...",
  "common.buyNow": "立即購買", "common.price": "價格",
  "announcement.0": "🎉 早鳥優惠：7月15日前結帳輸入 EARLYBIRD 折 ₩2,000",
  "announcement.1": "三個 K-Beauty 品牌，一站購足 — Min Seoul",
  "announcement.2": "新品上市 🌿 Giclee 玫瑰果油",
  "home.hero.0.title": "全膚質抗老系列",
  "home.hero.0.subtitle": "適合各種膚質，兼具抗老功效。",
  "home.hero.1.title": "Ectoin 屏障系列",
  "home.hero.1.subtitle": "長效保濕，防止水分流失。",
  "home.hero.2.title": "茶樹化妝水",
  "home.hero.2.subtitle": "瞬間降低肌膚溫度 2.63°C，控制多餘油脂。",
  "home.hero.3.title": "SUNGBOON EDITION 護膚系列",
  "home.hero.3.subtitle": "亮白、緊緻毛孔，妝前完美打底。",
  "home.cat.skincare": "護膚", "home.cat.sets": "套組",
  "home.about.tag": "關於",
  "home.about.headline": "在 Min Seoul，我們相信好肌膚不在於追逐潮流，而是理解肌膚真正的需求——並選擇尊重肌膚的產品。",
  "home.about.cta": "更多關於 Min Seoul",
  "home.brands.title": "我們的品牌", "home.brands.link": "查看系列 →",
  "home.best.title": "熱銷商品", "home.best.link": "查看全部 →",
  "home.new.title": "新品上市", "home.new.sub": "探索最新上市產品",
  "home.story.eyebrow": "品牌故事", "home.story.title": "K-Beauty 邁向世界",
  "home.story.body": "Min Seoul 將韓國頂級美妝品牌帶入中國、馬來西亞等亞洲市場。",
  "home.story.cta": "了解更多",
  "hero.0.brand": "Giclee", "hero.0.title": "純淨 K-Beauty", "hero.0.subtitle": "純淨成分，日常保養儀式。",
  "hero.1.brand": "The Mute", "hero.1.title": "The Mute", "hero.1.subtitle": "極簡護膚，極致效果。",
  "hero.2.brand": "Aesthein", "hero.2.title": "新品上市", "hero.2.subtitle": "新季節，新保養程序。",
  "hero.cta": "立即選購",
  "pdp.addToCart": "加入購物袋", "pdp.soldOut": "已售完", "pdp.wishlist": "加入願望清單",
  "pdp.reviewsLabel": "{n} 則評論", "pdp.related": "此品牌其他商品",
  "pdp.notFound": "商品無法顯示",
  "pdp.notFound.sub": "無法載入此商品，請稍後再試。",
  "pdp.retry": "重試", "pdp.backToProducts": "返回商品列表",
  "pdp.backHome": "回到首頁 →",
  "pdp.breadcrumb.home": "首頁", "pdp.breadcrumb.products": "商品",
  "pdp.tab.detail": "商品詳情", "pdp.tab.ingredients": "成分",
  "pdp.tab.howto": "使用方法", "pdp.tab.caution": "注意事項",
  "pdp.tab.ingredients.empty": "成分資訊即將更新。",
  "pdp.tab.howto.empty": "使用方法即將更新。",
  "pdp.tab.caution.empty": "無特殊注意事項。",
  "pdp.added": "✓ 已加入", "pdp.viewFull": "查看完整詳情 →",
  "pdp.mainIngredients": "主要成分",
  "pdp.option": "選項",
  "review.title": "顧客評論", "review.totalLabel": "共 {n} 則評論",
  "review.more": "載入更多評論",
  "cart.title": "購物袋", "cart.count": "{n} 件商品",
  "cart.subtotal": "小計", "cart.shipping": "運費",
  "cart.free": "免運費", "cart.total": "訂單總計",
  "cart.checkout": "結帳", "cart.continue": "繼續購物",
  "cart.summary": "訂單摘要", "cart.empty": "購物袋是空的",
  "cart.empty.sub": "找到您喜愛的商品吧", "cart.empty.cta": "開始購物",
  "cart.free.threshold": "滿 ₩50,000 免運費",
  "cart.freeRemain": "再加 {amount} 即可免運費！",
  "cart.delete": "刪除", "cart.remove": "移除",
  "cart.drawer.empty": "購物袋是空的",
  "cart.drawer.subtotal": "小計",
  "cart.drawer.note": "運費將於結帳時計算。",
  "cart.secureNote": "安全結帳 · 30 天內免費退貨",
  "cart.unable": "無法開啟結帳，請重試。",
  "cart.error": "發生錯誤，請重試。",
  "coll.cat.skincare": "護膚", "coll.cat.sets": "套組", "coll.cat.all": "全部",
  "coll.showing": "顯示 {n} / {total} 件商品",
  "coll.storeUnavailable": "商店暫時無法使用",
  "coll.storeUnavailable.sub": "連線至商店時發生問題，請稍後再試。",
  "coll.tryAgain": "重試",
  "coll.noProducts": "找不到商品",
  "coll.noProducts.sub": "透過 Shopify 後台新增商品後，將自動顯示於此。",
  "coll.count": "{n} 件商品", "coll.empty": "此分類暫無商品",
  "coll.viewAll": "查看全部", "coll.more": "載入更多 (剩 {n})",
  "coll.allBrands": "全部品牌", "coll.allBrands.sub": "探索 Min Seoul 的所有品牌",
  "about.eyebrow": "關於 MIN SEOUL", "about.headline": "K-Beauty 邁向世界",
  "about.subtext": "將韓國美妝創新帶給全球消費者。",
  "about.brands": "我們的品牌", "about.shop": "立即選購 →",
  "about.mission.eyebrow": "我們的使命", "about.mission.title": "連接亞洲的 K-Beauty 橋樑",
  "about.mission.body": "Min Seoul 是專業的 K-Beauty 代理商，將 The Mute、Aesthein、Giclee 等韓國頂級美妝品牌帶入中國、馬來西亞等亞洲市場。",
  "about.stat1": "合作品牌", "about.stat2": "進駐國家", "about.stat3": "主要通路",
  "about.cta.title": "合作洽詢",
  "about.cta.subtext": "與 Min Seoul 共創 K-Beauty 的未來。",
  "about.cta.button": "聯絡我們",
  "footer.tagline": "將 K-Beauty 帶給世界",
  "footer.support": "客服", "footer.email": "電子郵件",
  "footer.hours": "營業時間：平日 10:00–18:00 (KST)",
  "footer.social": "社群媒體",
  "footer.terms": "使用條款", "footer.privacy": "隱私權政策", "footer.business": "公司資訊",
  "footer.copyright": "© 2026 Min Seoul. 版權所有。",
  "i18n.language": "語言", "i18n.currency": "貨幣",
  "pdp.pillar.daily": "日常肌膚保養", "pdp.pillar.targeted": "針對性功效", "pdp.pillar.trusted": "值得信賴的配方",
};

const zhCN: Record<string, string> = {
  "nav.menu": "菜单", "nav.search": "搜索", "nav.account": "账户", "nav.cart": "购物袋",
  "nav.myAccount": "我的账户", "nav.signOut": "退出登录",
  "nav.products": "商品", "nav.about": "关于", "nav.contact": "联系我们",
  "nav.brand": "品牌", "nav.collection": "系列", "nav.view": "立即购买 →",
  "menu.close": "关闭", "menu.homeProducts": "首页\n商品", "menu.shopNow": "立即购买 ›",
  "common.home": "首页", "common.processing": "处理中...", "common.loading": "加载中...",
  "common.buyNow": "立即购买", "common.price": "价格",
  "announcement.0": "🎉 早鸟优惠：7月15日前结账输入 EARLYBIRD 立减 ₩2,000",
  "announcement.1": "三个 K-Beauty 品牌，一站购齐 — Min Seoul",
  "announcement.2": "新品上市 🌿 Giclee 玫瑰果油",
  "home.hero.0.title": "全肤质抗老系列",
  "home.hero.0.subtitle": "适合各种肤质，兼具抗老功效。",
  "home.hero.1.title": "Ectoin 屏障系列",
  "home.hero.1.subtitle": "长效保湿，防止水分流失。",
  "home.hero.2.title": "茶树爽肤水",
  "home.hero.2.subtitle": "瞬间降低肌肤温度 2.63°C，控制多余油脂。",
  "home.hero.3.title": "SUNGBOON EDITION 护肤系列",
  "home.hero.3.subtitle": "美白、紧致毛孔，妆前完美打底。",
  "home.cat.skincare": "护肤", "home.cat.sets": "套装",
  "home.about.tag": "关于",
  "home.about.headline": "在 Min Seoul，我们相信好肌肤不在于追逐潮流，而在于理解肌肤真正的需求——并选择尊重肌肤的产品。",
  "home.about.cta": "更多关于 Min Seoul",
  "home.brands.title": "我们的品牌", "home.brands.link": "查看系列 →",
  "home.best.title": "热销商品", "home.best.link": "查看全部 →",
  "home.new.title": "新品上市", "home.new.sub": "探索最新上市产品",
  "home.story.eyebrow": "品牌故事", "home.story.title": "K-Beauty 走向世界",
  "home.story.body": "Min Seoul 将韩国顶级美妆品牌带入中国、马来西亚等亚洲市场。",
  "home.story.cta": "了解更多",
  "hero.0.brand": "Giclee", "hero.0.title": "纯粹 K-Beauty", "hero.0.subtitle": "源自自然的纯粹，融入日常护肤。",
  "hero.1.brand": "The Mute", "hero.1.title": "The Mute", "hero.1.subtitle": "极简护肤，极致效果。",
  "hero.2.brand": "Aesthein", "hero.2.title": "新品上市", "hero.2.subtitle": "新季节，新护肤程序。",
  "hero.cta": "立即购买",
  "pdp.addToCart": "加入购物车", "pdp.soldOut": "售罄", "pdp.wishlist": "加入心愿单",
  "pdp.reviewsLabel": "{n} 条评价", "pdp.related": "同品牌其他产品",
  "pdp.notFound": "商品无法显示",
  "pdp.notFound.sub": "无法加载此商品，请稍后再试。",
  "pdp.retry": "重试", "pdp.backToProducts": "返回商品列表",
  "pdp.backHome": "返回首页 →",
  "pdp.breadcrumb.home": "首页", "pdp.breadcrumb.products": "商品",
  "pdp.tab.detail": "商品详情", "pdp.tab.ingredients": "成分",
  "pdp.tab.howto": "使用方法", "pdp.tab.caution": "注意事项",
  "pdp.tab.ingredients.empty": "成分信息即将更新。",
  "pdp.tab.howto.empty": "使用方法即将更新。",
  "pdp.tab.caution.empty": "无特殊注意事项。",
  "pdp.added": "✓ 已加入", "pdp.viewFull": "查看完整详情 →",
  "pdp.mainIngredients": "主要成分",
  "pdp.option": "选项",
  "review.title": "顾客评价", "review.totalLabel": "共 {n} 条评价",
  "review.more": "查看更多评价",
  "cart.title": "购物袋", "cart.count": "{n} 件商品",
  "cart.subtotal": "小计", "cart.shipping": "运费",
  "cart.free": "免费", "cart.total": "订单总额",
  "cart.checkout": "去结算", "cart.continue": "继续购物",
  "cart.summary": "订单摘要", "cart.empty": "购物袋是空的",
  "cart.empty.sub": "找到您喜欢的产品吧", "cart.empty.cta": "开始购物",
  "cart.free.threshold": "满 ₩50,000 免运费",
  "cart.freeRemain": "再加 {amount} 即可免运费！",
  "cart.delete": "删除", "cart.remove": "移除",
  "cart.drawer.empty": "购物袋是空的",
  "cart.drawer.subtotal": "小计",
  "cart.drawer.note": "运费将在结算时计算。",
  "cart.secureNote": "安全结算 · 30 天内免费退货",
  "cart.unable": "无法打开结算，请重试。",
  "cart.error": "发生错误，请重试。",
  "coll.cat.skincare": "护肤", "coll.cat.sets": "套装", "coll.cat.all": "全部",
  "coll.showing": "显示 {n} / {total} 件商品",
  "coll.storeUnavailable": "商店暂时无法使用",
  "coll.storeUnavailable.sub": "连接商店时出现问题，请稍后再试。",
  "coll.tryAgain": "重试",
  "coll.noProducts": "未找到商品",
  "coll.noProducts.sub": "通过 Shopify 后台添加商品后，将自动显示于此。",
  "coll.count": "{n} 件商品", "coll.empty": "该分类暂无商品",
  "coll.viewAll": "查看全部", "coll.more": "加载更多 (剩 {n})",
  "coll.allBrands": "全部品牌", "coll.allBrands.sub": "探索 Min Seoul 的全部品牌",
  "about.eyebrow": "关于 MIN SEOUL", "about.headline": "K-Beauty 走向世界",
  "about.subtext": "把韩国美妆创新带给全球消费者。",
  "about.brands": "我们的品牌", "about.shop": "查看产品 →",
  "about.mission.eyebrow": "我们的使命", "about.mission.title": "连接亚洲的 K-Beauty 桥梁",
  "about.mission.body": "Min Seoul 是 K-Beauty 专业分销商，将 The Mute、Aesthein、Giclee 等韩国顶级美妆品牌带入中国、马来西亚等亚洲市场。",
  "about.stat1": "合作品牌", "about.stat2": "进入国家", "about.stat3": "主要渠道",
  "about.cta.title": "合作咨询",
  "about.cta.subtext": "与 Min Seoul 共创 K-Beauty 的未来。",
  "about.cta.button": "邮件联系",
  "footer.tagline": "把 K-Beauty 带给世界",
  "footer.support": "客户服务", "footer.email": "邮箱",
  "footer.hours": "营业时间：工作日 10:00–18:00 (KST)",
  "footer.social": "社交媒体",
  "footer.terms": "使用条款", "footer.privacy": "隐私政策", "footer.business": "公司信息",
  "footer.copyright": "© 2026 Min Seoul. 版权所有。",
  "i18n.language": "语言", "i18n.currency": "货币",
  "pdp.pillar.daily": "日常肌肤护理", "pdp.pillar.targeted": "针对性功效", "pdp.pillar.trusted": "值得信赖的配方",
};

const th: Record<string, string> = {
  "nav.menu": "เมนู", "nav.search": "ค้นหา", "nav.account": "บัญชี", "nav.cart": "ตะกร้า",
  "nav.myAccount": "บัญชีของฉัน", "nav.signOut": "ออกจากระบบ",
  "nav.products": "สินค้า", "nav.about": "เกี่ยวกับ", "nav.contact": "ติดต่อ",
  "nav.brand": "แบรนด์", "nav.collection": "คอลเลกชัน", "nav.view": "ช้อปเลย →",
  "menu.close": "ปิด", "menu.homeProducts": "หน้าแรก\nสินค้า", "menu.shopNow": "ช้อปเลย ›",
  "common.home": "หน้าแรก", "common.processing": "กำลังดำเนินการ...", "common.loading": "กำลังโหลด...",
  "common.buyNow": "ซื้อเลย", "common.price": "ราคา",
  "announcement.0": "🎉 Early Bird: ลด ₩2,000 ถึง 15 ก.ค. ใช้โค้ด EARLYBIRD ตอนชำระเงิน",
  "announcement.1": "สามแบรนด์ K-Beauty ในที่เดียว — Min Seoul",
  "announcement.2": "สินค้าใหม่ 🌿 Giclee Rosehip Oil",
  "home.hero.0.title": "ไลน์ต้านริ้วรอยสำหรับทุกสภาพผิว",
  "home.hero.0.subtitle": "ดูแลผิวได้ทุกประเภท พร้อมคุณสมบัติต้านริ้วรอย",
  "home.hero.1.title": "ไลน์ Ectoin เสริมเกราะป้องกันผิว",
  "home.hero.1.subtitle": "รักษาความชุ่มชื้นยาวนาน ป้องกันการสูญเสียน้ำ",
  "home.hero.2.title": "โทนเนอร์ทีทรี",
  "home.hero.2.subtitle": "ลดอุณหภูมิผิวทันที 2.63°C ควบคุมความมัน",
  "home.hero.3.title": "ไลน์สกินแคร์ SUNGBOON EDITION",
  "home.hero.3.subtitle": "ผิวกระจ่างใส กระชับรูขุมขน เตรียมผิวก่อนแต่งหน้า",
  "home.cat.skincare": "สกินแคร์", "home.cat.sets": "เซ็ต",
  "home.about.tag": "เกี่ยวกับ",
  "home.about.headline": "ที่ Min Seoul เราเชื่อว่าผิวที่ดีไม่ใช่การตามเทรนด์ แต่คือการเข้าใจผิวจริงๆ และเลือกสินค้าที่เคารพในธรรมชาติของผิว",
  "home.about.cta": "รู้จัก Min Seoul เพิ่มเติม",
  "home.brands.title": "แบรนด์ของเรา", "home.brands.link": "ดูคอลเลกชัน →",
  "home.best.title": "สินค้าขายดี", "home.best.link": "ดูทั้งหมด →",
  "home.new.title": "สินค้าใหม่", "home.new.sub": "พบกับสินค้าล่าสุดของเรา",
  "home.story.eyebrow": "เรื่องราวของเรา", "home.story.title": "K-Beauty สู่ทั่วโลก",
  "home.story.body": "Min Seoul นำแบรนด์ความงามชั้นนำของเกาหลีสู่ตลาดจีน มาเลเซีย และเอเชีย",
  "home.story.cta": "เรื่องราวของเรา",
  "hero.0.brand": "Giclee", "hero.0.title": "K-Beauty บริสุทธิ์", "hero.0.subtitle": "ส่วนผสมบริสุทธิ์ กิจวัตรประจำวันของคุณ",
  "hero.1.brand": "The Mute", "hero.1.title": "The Mute", "hero.1.subtitle": "สกินแคร์มินิมัล ประสิทธิภาพสูงสุด",
  "hero.2.brand": "Aesthein", "hero.2.title": "สินค้าใหม่", "hero.2.subtitle": "ฤดูกาลใหม่ กิจวัตรใหม่",
  "hero.cta": "ช้อปเลย",
  "pdp.addToCart": "หยิบใส่ตะกร้า", "pdp.soldOut": "สินค้าหมด", "pdp.wishlist": "เพิ่มในรายการโปรด",
  "pdp.reviewsLabel": "{n} รีวิว", "pdp.related": "สินค้าอื่นจากแบรนด์นี้",
  "pdp.notFound": "ไม่สามารถแสดงสินค้าได้",
  "pdp.notFound.sub": "โหลดสินค้าไม่สำเร็จ กรุณาลองใหม่",
  "pdp.retry": "ลองใหม่", "pdp.backToProducts": "กลับไปดูสินค้า",
  "pdp.backHome": "กลับหน้าหลัก →",
  "pdp.breadcrumb.home": "หน้าแรก", "pdp.breadcrumb.products": "สินค้า",
  "pdp.tab.detail": "รายละเอียด", "pdp.tab.ingredients": "ส่วนผสม",
  "pdp.tab.howto": "วิธีใช้", "pdp.tab.caution": "ข้อควรระวัง",
  "pdp.tab.ingredients.empty": "ข้อมูลส่วนผสมจะอัปเดตเร็วๆ นี้",
  "pdp.tab.howto.empty": "วิธีใช้จะอัปเดตเร็วๆ นี้",
  "pdp.tab.caution.empty": "ไม่มีข้อควรระวังพิเศษ",
  "pdp.added": "✓ เพิ่มแล้ว", "pdp.viewFull": "ดูรายละเอียดเต็ม →",
  "pdp.mainIngredients": "ส่วนผสมหลัก",
  "pdp.option": "ตัวเลือก",
  "review.title": "รีวิวจากลูกค้า", "review.totalLabel": "รวม {n} รีวิว",
  "review.more": "โหลดรีวิวเพิ่ม",
  "cart.title": "ตะกร้าสินค้า", "cart.count": "{n} รายการ",
  "cart.subtotal": "รวม", "cart.shipping": "ค่าจัดส่ง",
  "cart.free": "ฟรี", "cart.total": "ยอดรวมทั้งหมด",
  "cart.checkout": "ชำระเงิน", "cart.continue": "ช้อปต่อ",
  "cart.summary": "สรุปคำสั่งซื้อ", "cart.empty": "ตะกร้าของคุณว่างเปล่า",
  "cart.empty.sub": "ค้นหาสินค้าที่คุณชอบ", "cart.empty.cta": "เริ่มช้อป",
  "cart.free.threshold": "ส่งฟรีเมื่อซื้อครบ ₩50,000",
  "cart.freeRemain": "เพิ่มอีก {amount} เพื่อรับสิทธิ์ส่งฟรี!",
  "cart.delete": "ลบ", "cart.remove": "นำออก",
  "cart.drawer.empty": "ตะกร้าของคุณว่างเปล่า",
  "cart.drawer.subtotal": "รวม",
  "cart.drawer.note": "คำนวณค่าจัดส่งเมื่อชำระเงิน",
  "cart.secureNote": "ชำระเงินปลอดภัย · คืนสินค้าฟรีภายใน 30 วัน",
  "cart.unable": "ไม่สามารถเปิดหน้าชำระเงินได้ กรุณาลองใหม่",
  "cart.error": "เกิดข้อผิดพลาด กรุณาลองใหม่",
  "coll.cat.skincare": "สกินแคร์", "coll.cat.sets": "เซ็ต", "coll.cat.all": "ทั้งหมด",
  "coll.showing": "แสดง {n} จาก {total} รายการ",
  "coll.storeUnavailable": "ร้านค้าไม่พร้อมใช้งานชั่วคราว",
  "coll.storeUnavailable.sub": "มีปัญหาในการเชื่อมต่อร้านค้า กรุณาลองใหม่ภายหลัง",
  "coll.tryAgain": "ลองใหม่",
  "coll.noProducts": "ไม่พบสินค้า",
  "coll.noProducts.sub": "เพิ่มสินค้าผ่าน Shopify admin แล้วจะแสดงที่นี่โดยอัตโนมัติ",
  "coll.count": "{n} รายการ", "coll.empty": "ไม่มีสินค้าในหมวดหมู่นี้",
  "coll.viewAll": "ดูทั้งหมด", "coll.more": "โหลดเพิ่ม (เหลือ {n})",
  "coll.allBrands": "แบรนด์ทั้งหมด", "coll.allBrands.sub": "ดูทุกแบรนด์ที่ Min Seoul",
  "about.eyebrow": "เกี่ยวกับ MIN SEOUL", "about.headline": "K-Beauty สู่ทั่วโลก",
  "about.subtext": "นำนวัตกรรมความงามเกาหลีสู่ผู้บริโภคทั่วโลก",
  "about.brands": "แบรนด์ของเรา", "about.shop": "ช้อปเลย →",
  "about.mission.eyebrow": "ภารกิจของเรา", "about.mission.title": "สะพาน K-Beauty เชื่อมเอเชีย",
  "about.mission.body": "Min Seoul เป็นผู้จัดจำหน่าย K-Beauty ที่นำแบรนด์ชั้นนำเกาหลี — The Mute, Aesthein, และ Giclee — สู่ตลาดเอเชียรวมถึงจีนและมาเลเซีย",
  "about.stat1": "แบรนด์", "about.stat2": "ประเทศ", "about.stat3": "ช่องทางหลัก",
  "about.cta.title": "สอบถามความร่วมมือ",
  "about.cta.subtext": "ร่วมสร้างอนาคตของ K-Beauty กับ Min Seoul",
  "about.cta.button": "ติดต่อเรา",
  "footer.tagline": "นำ K-Beauty สู่ทั่วโลก",
  "footer.support": "ฝ่ายบริการลูกค้า", "footer.email": "อีเมล",
  "footer.hours": "เวลาทำการ: จันทร์-ศุกร์ 10:00–18:00 (KST)",
  "footer.social": "โซเชียลมีเดีย",
  "footer.terms": "ข้อกำหนดการใช้งาน", "footer.privacy": "นโยบายความเป็นส่วนตัว", "footer.business": "ข้อมูลบริษัท",
  "footer.copyright": "© 2026 Min Seoul. สงวนลิขสิทธิ์",
  "i18n.language": "ภาษา", "i18n.currency": "สกุลเงิน",
  "pdp.pillar.daily": "ดูแลผิวประจำวัน", "pdp.pillar.targeted": "ประโยชน์เฉพาะจุด", "pdp.pillar.trusted": "สูตรที่เชื่อถือได้",
};

const dict: Partial<Record<Locale, Record<string, string>>> = {
  en,
  "zh-TW": zhTW,
  "zh-CN": zhCN,
  zh: zhCN,
  th,
  ko: en, // Korean UI is not offered anymore; fall back to English
};

const LOCALE_KEY   = "selve_locale";
const CURRENCY_KEY = "selve_currency";

const detectInitialLocale = (): Locale => {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem(LOCALE_KEY) as Locale | null;
  if (stored && LOCALES.some((l) => l.code === stored)) return stored;
  return "en";
};
const detectInitialCurrency = (): Currency => {
  if (typeof window === "undefined") return "USD";
  const stored = localStorage.getItem(CURRENCY_KEY) as Currency | null;
  return stored && stored in CURRENCIES ? stored : "USD";
};

function interpolate(s: string, vars?: Record<string, string | number>) {
  if (!vars) return s;
  return s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [currency, setCurrencyState] = useState<Currency>("USD");

  useEffect(() => {
    const l = detectInitialLocale();
    const c = detectInitialCurrency();
    if (l !== locale) setLocaleState(l);
    if (c !== currency) setCurrencyState(c);
    if (typeof document !== "undefined") document.documentElement.lang = l;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") localStorage.setItem(LOCALE_KEY, l);
    if (typeof document !== "undefined") document.documentElement.lang = l;
  };
  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    if (typeof window !== "undefined") localStorage.setItem(CURRENCY_KEY, c);
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
    const t = (key: string) =>
      dict[locale]?.[key] ?? dict.en?.[key] ?? key;
    const tt = (en: string) => translatePdp(en, locale);
    const tr = (val: LocalizedString | undefined | null, fallback = "") =>
      resolveLocalized(val, locale, fallback);
    return { locale, setLocale, currency, setCurrency, formatPrice, t, tt, tr };
  }, [locale, currency]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLocale() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

export const tInterpolate = interpolate;
