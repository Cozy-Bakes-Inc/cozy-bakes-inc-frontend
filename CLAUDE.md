# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (see `pnpm-lock.yaml` / `pnpm-workspace.yaml`).

- `pnpm dev` — start dev server (Turbopack, via `next dev`)
- `pnpm build` — production build
- `pnpm start` — run production build
- `pnpm lint` — ESLint (flat config, `eslint-config-next` core-web-vitals + typescript)

There is no test runner configured in this repo.

## Architecture

Next.js 16 App Router project (React 19) for a bakery e-commerce storefront. Backend is a separate API consumed over REST at `NEXT_PUBLIC_API_BASE_URL` (env var in `.env`).

### Route groups

- `src/app/(auth)/` — login, sign-up, forgot/new-password, verify-otp. Own layout at `(auth)/layout.tsx`.
- `src/app/(main)/` — the storefront shell, with a nested `(site)` group for public marketing/catalog pages (categories, products, menu, farmers-market, story) versus authenticated/transactional pages living directly under `(main)` (account, cart, checkout, payment).

### Route protection

`src/proxy.ts` holds the Next.js middleware logic (matcher-based): redirects unauthenticated users away from `/account` and `/checkout`, and redirects authenticated users away from guest-only auth routes. It special-cases Stripe's cross-site redirect return (which drops `SameSite=Lax` cookies) by bouncing through `/payment/stripe-return` as a same-site landing page before continuing to the real destination.

### Data layer (services → hooks → components)

Three-tier convention repeated per domain (e.g. `products`, `checkout`, `account/orders`):

1. **`src/services/queries/*` and `src/services/mutations/*`** — raw API calls only. Use `baseAPI<T>(method, url)` (throws, returns `.data` directly) for straightforward GETs, or `safeApi<T,E>(method, url, data, config)` (never throws; returns `{ ok, status, data|error, message }`) when the caller needs to branch on failure. Both live in `src/services/index.ts`, which also wraps a shared axios instance with an interceptor that triggers a registered "unauthorized" handler on 401s carrying an Authorization header.
2. **`src/hooks/api/*`** — React Query hooks wrapping the service functions via the shared `useCustomQuery` / `useCustomInfiniteQuery` (`src/hooks/useCustomQuery.ts`) and `useCustomMutation` (`src/hooks/useCustomMutation.ts`) wrappers. Query keys are plain arrays, e.g. `["products", "preview", sort]`. Infinite queries follow a consistent `getNextPageParam` shape based on Laravel-style pagination (`current_page`/`last_page`/`next_page_url`).
3. **Components** consume the hooks — never call `services/*` directly from a component.

`QueryClient` is created via `getQueryClient()` (`src/lib/utils/query.ts`), which is server/browser-aware (new client per request on the server, singleton in the browser). `QueryProvider` (`src/provider/query.tsx`) registers `handleUnauthorizedSession` (`src/lib/utils/client-auth.ts`) as the 401 handler on mount — this clears the token cookie, clears the query cache, toasts, and redirects to `/login` with a `returnTo`.

### Auth/session

- `src/lib/utils/auth.ts` (`"use server"`) — reads/writes/clears the `token` httpOnly cookie server-side; this is the source of truth used by `getAuthHeaders` when building request headers.
- `src/lib/utils/client-auth.ts` (`"use client"`) — client-side session teardown/redirect flows (expired session, explicit logout).

### Cart

`src/store/cart-store.ts` is a Zustand store, persisted through a manually-managed `cozy_bakes_cart` cookie (not `localStorage`, and not zustand's `persist` middleware) so the cart is readable from the server if needed. Call `hydrateCart()` on mount before trusting `items` (initial state is always empty to avoid SSR/client mismatch). Cart items support two pricing shapes: fixed-price "pack" items (plain `quantity`) and per-unit "flavor" items (`unitPrice` + `flavors` map, where price is recomputed from the flavor counts).

### Types vs interfaces

The codebase splits domain shapes across `src/interfaces/` (mostly API request/response and pagination shapes, e.g. `PaginatedApiResponse`) and `src/types/` (mostly derived/view types, e.g. `SingleProductResponse`, form/axios types). When adding a new domain, mirror the existing sibling files rather than picking one directory arbitrarily — check how a similar existing feature (e.g. `products`, `checkout`) splits things first.

### Path aliases & UI primitives

- `@/*` maps to `src/*` (see `tsconfig.json`).
- shadcn/ui is configured (`components.json`, style `new-york`, base color `neutral`) with primitives under `src/components/ui/`. Use the existing `@/components/ui/*`, `@/lib/utils`, `@/hooks` aliases rather than reinventing equivalents.
- Icons: `lucide-react`. Animation: `framer-motion` (shared variants in `src/lib/motion/variants.ts`). Carousels: `swiper`. Maps: `leaflet` / `react-leaflet` (used for farmers-market location features; `canvas` is aliased to an empty module in `next.config.ts` for Turbopack compatibility with `leaflet`).
