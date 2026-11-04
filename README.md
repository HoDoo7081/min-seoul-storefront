# Min Seoul Storefront

A multilingual K-beauty e-commerce storefront (live at [minseoul.com](https://minseoul.com)), built as a freelance project on top of Shopify. Shopify handles products, checkout, and orders; this app provides the custom storefront, customer account area, and a small operations dashboard.

Built with AI-assisted coding (Lovable) from a client-provided Figma design. Developer: Doo Ho Ahn.

## What it does

- **Storefront:** home, brand collections, product detail pages, search, cart, and static pages (about, business inquiry, contact, terms, privacy), all backed by the Shopify Storefront API.
- **Languages and currencies:** English, Traditional Chinese, and Simplified Chinese, with display-only currency conversion (USD base; NT$ and CNY estimates shown for reference).
- **Customer accounts:** registration, login, password reset, profile, order history, and order tracking.
- **Influencer discount codes:** a per-code landing route (`/discount/:code`) that records visits, plus an admin-only dashboard showing clicks, unique visitors, and recent activity by code.
- **Transactional email:** authentication and notification email queue on the backend.

## Stack

| Layer | Choice |
|---|---|
| App framework | TanStack Start (React 19, TypeScript), TanStack Router |
| Styling | Tailwind CSS 4 |
| Commerce | Shopify Storefront API (public token) and Admin API (server-side only) |
| Backend data and auth | Supabase (Postgres migrations in `supabase/migrations`) |
| Hosting | Cloudflare Workers (`wrangler.jsonc`) |

## Configuration

Secrets are **not** stored in this repository. Server-side values such as `SHOPIFY_ACCESS_TOKEN` and `SUPABASE_SERVICE_ROLE_KEY` are read from environment variables at runtime. The committed `.env` contains only Supabase's public project ID, URL, and publishable (anon) key.

## Run locally

```bash
bun install
bun run dev
```

Server features (orders, customer lookup, email queue) need the environment variables above and will not work without them.

## Scope and limits

- Client project: brand, products, and store data belong to the client.
- Payment gateways and cross-border payment methods are configured in Shopify, not in this code.
- Not load-tested; there is no automated test suite in this repository.
