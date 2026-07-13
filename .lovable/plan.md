# Full-site audit as a first-time user

I'll go page by page as a brand-new visitor, click every button/link, and fix anything that's broken, missing, or awkward. Below is the concrete scope so we agree on what "complete" means before I start editing.

## Pass 1 — Blocking runtime errors

- **`[API] Invalid API key or access token`** on Shopify customer sync (fires on every login).
  - Root cause: `syncSignupCustomerToShopify` in `src/lib/shopify-customers.functions.ts` is using an env var / secret that no longer matches (likely `SHOPIFY_ACCESS_TOKEN` vs. the online token stored per-user).
  - Fix: swap to the Admin API token the project actually has (`SHOPIFY_ACCESS_TOKEN`), fail silently for anonymous callers, and stop calling the sync on every `SIGNED_IN`/token refresh — only after profile is complete.
- Verify `/account/tracking` no longer shows raw "Not authorized" as an error state (it's expected for non-admins) — show a proper 403 empty state.

## Pass 2 — Auth flow (new-user perspective)

- `/account/register`: verify Google/Apple buttons are also on this page (currently only on login).
- `/account/login`: confirm `verified=1` query shows a "email confirmed" toast.
- `/account/reset`: verify the password reset page exists at `/reset-password` (spec requires it); create if missing.
- Profile completion modal: verify it doesn't loop after save, and that "Cancel & sign out" fully clears state.
- Header/GNB "Account" link: verify it routes correctly for logged-out (→ `/account/login`) vs logged-in (→ `/account/dashboard`).

## Pass 3 — Shopping flow

- Home → product grid → PDP → Add to cart → Cart drawer → Cart page → PreCheckoutGate → Shopify checkout.
- Check: variant selector works, out-of-stock disables Add to Cart, cart badge updates, drawer opens on add, cart persists on refresh, gate modal saves country/EZ Way once and never re-prompts.
- Collection page (`/collections/$brandHandle`): verify each brand handle actually resolves; fix broken links from GNB/Footer.
- Search page: verify it returns results for a valid query and shows empty state cleanly.
- Discount deep link (`/discount/$code`): verify redirect + cookie set.

## Pass 4 — Content pages

- `/pages/about`, `/pages/business`, `/pages/contact`, `/pages/privacy`, `/pages/terms`: verify each renders, has a proper `<h1>`, unique `head()` title/description, and no placeholder text.
- Fix any Footer / GNB link that 404s.

## Pass 5 — Account area

- Dashboard: verify order history loads (Shopify orders by email) and no fake "Track Order" leftover.
- Profile: verify Save persists, Taiwan validation triggers, Shopify sync succeeds.
- Admin discounts (`/account/admin-discounts`): verify admin-only gate.

## Pass 6 — UX polish

- Loading skeletons vs. blank flashes on every route.
- Toast positions (never bottom-right per spec).
- Mobile viewport at 375px: header menu, cart drawer, modal scroll.
- Locale switcher (ZH-TW auto-detect for Taiwan IP already implemented) — verify persistence.

## Deliverables

- Every fix committed with a short note in chat per pass.
- No new features beyond what's needed to make existing flows work.
- Anything I can't fix without a decision from you (e.g., missing brand handle mapping, missing content copy) I'll list at the end with a proposed default.

## Technical notes

- Fixes will touch: `src/lib/shopify-customers.functions.ts`, `src/hooks/useAuth.ts`, `src/routes/account.*`, `src/routes/pages.*`, `src/components/common/GNB.tsx`, `src/components/common/Footer.tsx`, `src/pages/*`.
- Type-check with `bunx tsgo --noEmit` after each pass.
- No DB migrations expected; if one is needed (e.g., missing column), I'll surface it before running.

Approve and I'll start with Pass 1 (the Shopify sync error) since that's blocking every logged-in user right now.