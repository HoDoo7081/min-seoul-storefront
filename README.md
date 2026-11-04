# K-Beauty Bridge

Create a React + TypeScript + Tailwind CSS project for a K-Beauty multi-brand Shopify storefront called BridgeGroup.

Project structure:
src/
  components/
    common/         ← GNB, Footer, ProductCard, Button, Badge
    home/           ← HeroBanner, BrandStrip, ProductRow, BrandStoryCTA
    collection/     ← FilterBar, ProductGrid
    pdp/            ← ImageGallery, VariantSelector, ProductInfo, TabSection, ReviewSection
    cart/           ← CartItem, OrderSummary
    about/          ← BrandCard, StatsRow
  pages/
    HomePage.tsx
    CollectionPage.tsx
    ProductDetailPage.tsx
    CartPage.tsx
    AboutPage.tsx
  hooks/
    useCart.ts
    useProduct.ts
  lib/
    shopify.ts      ← Shopify Storefront API client (stub for now)
    types.ts
  data/
    mockProducts.ts
    mockBrands.ts

Routing (React Router):
  / → HomePage
  /collections/:brandHandle → CollectionPage
  /products/:handle → ProductDetailPage
  /cart → CartPage
  /pages/about → AboutPage

Design system — CSS variables in index.css:
  --color-primary: #1a1a1a
  --color-accent: #c9a96e       ← K-Beauty gold accent
  --color-bg: #fafaf8
  --color-surface: #ffffff
  --color-border: #e8e5e0
  --color-text: #1a1a1a
  --color-text-muted: #888580
  --color-brand-mute: #2d2d2d       ← The Mute
  --color-brand-aesthein: #8b7355   ← Aesthein
  --color-brand-giclee: #4a6741     ← Giclee
  --font-heading: 'Playfair Display', serif
  --font-body: 'DM Sans', sans-serif
  --radius-card: 12px
  --radius-btn: 8px
  --transition-smooth: all 0.3s ease

Install: react-router-dom, @types/react-router-dom

Load Google Fonts: Playfair Display (400, 600), DM Sans (300, 400, 500)

Set body background to var(--color-bg), font-family to var(--font-body).

-> 원하는 샘플 템플릿
https://themes.shopify.com/themes/motto/presets/gorgeous?surface_detail=beauty&surface_inter_position=3&surface_intra_position=23&surface_type=search____

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://pureveseoul.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/eefd5c76-03d5-4b98-a667-1fa4594c8492).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
