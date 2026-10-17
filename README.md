# Rooqx storefront engine

One Next.js storefront renderer serves many merchants. The request host resolves a verified store, the data source loads its published snapshot, and the pure assembly layer selects the page content. The same React components render public pages and merchant previews. Nine theme manifests share those contracts and commerce flows.

The branch is an implementation checkpoint, not an approved release of all nine concepts. The [engine audit](docs/ENGINE_AUDIT.md) lists visual, catalog and backend gaps with the checks completed so far.

## Run the local demonstration

```bash
pnpm install --frozen-lockfile
STOREFRONT_MODE=mock pnpm dev
```

Open `/studio` to edit one of three demo stores. `/stores/sprout-and-co`, `/stores/form-and-function`, and `/stores/maison-lune` are local preview URLs. Demo publishing works only in the development server; it is in memory and resets when the server restarts. Production builds can show draft previews but cannot publish demo data. The preview never charges a card or creates a real order.

Checks: `pnpm typecheck`, `pnpm test`, `pnpm lint:security`, and `STOREFRONT_MODE=mock pnpm build`.

## Integration map

| Module | Responsibility |
| --- | --- |
| `src/engine/types.ts`, `validation.ts`, `theme-registry.ts`, `assemble.ts` | Portable contracts, nine theme manifests, validation, page assembly |
| `src/engine/data-source.ts` | Tenant-aware mock source and NestJS gateway interface |
| `src/engine/server-render.tsx` | Next.js host resolution, published page rendering, metadata |
| `src/engine/ui` | Shared storefront UI, theme compositions, studio, Favorites, cart and demo checkout |
| `src/app` | Public routes, local preview routes, demo publish endpoint |

The main frontend should import the engine and UI modules. The main NestJS backend remains authoritative for stores, product prices, inventory, customers, orders, payments, and published configurations. `BackendStorefrontGateway` intentionally declares operations without inventing endpoints or payload shapes. Before live deployment, implement that gateway against the actual backend contract and inject it in the server composition root. The current `getDemoSource()` fails closed in production unless `STOREFRONT_MODE=mock` is explicitly set.

## Live integration work still required

1. Connect verified domain resolution and versioned published snapshots to NestJS, including ownership checks and cache invalidation.
2. Replace the demo cart handoff with backend price and stock validation, shipping/tax quotes, an idempotent order operation, hosted payment, and verified confirmation.
3. Connect customer session and order tracking to the main identity and order services. Never accept a browser-provided store ID or order status as authorization.
4. Add paginated catalog queries and search. The local snapshot holds a small demo catalog and is not suitable for a large live inventory.
5. Use the platform's approved media proxy for merchant images, then load-test domains, catalog traffic, and publishing before claiming scale.

Public storefront routes are server-rendered. The local `/stores/[storeId]` routes use published data and draft messages only inside the same-origin studio iframe. Drafts stay in browser storage until explicitly published. Each storefront cart and Favorites list has a tenant-specific key. The theme registry offers three Mothercare-inspired, three gadget-inspired, and three clothing-inspired designs. Any store may choose any design; each uses the same merchant data contracts. CSS composition classes and validated design tokens own visual variations, while the core assembly rules remain theme-independent. `/prototypes` remains an isolated visual reference and is not the public storefront renderer.
