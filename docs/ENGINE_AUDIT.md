# Storefront engine audit — 17 October 2026

Status: **in progress; not ready to merge or publish as the approved templates.** This audit compares the current branch with the nine approved desktop/mobile concept images in `public/prototypes/` and the project handoff's page architecture.

## Decision

The engine boundaries are a reasonable starting point, but the theme implementation fails visual and journey parity. The nine registry entries are mostly token and CSS variations on three shared layouts. The concept screenshots imply different merchandising components, imagery, discovery paths, and product details that the current contracts cannot express. Studio shows the approved images as theme previews even though its live preview renders something materially different. This is a release blocker.

| Dimension | Score / 4 | Evidence |
| --- | ---: | --- |
| Accessibility | 3 | Semantic routes, labels and focus styles exist. Mobile navigation was missing; a menu and search field have now been added, pending final browser check. |
| Performance | 2 | Server rendering and image sizes are present; the snapshot still loads the entire catalog and remote images are unoptimized. Studio thumbnail delivery has been reduced with `next/image`. |
| Responsive | 3 | Core layouts have mobile rules and no overflow was observed in the inspected M1 viewport. The newly added menu needs verification across all themes. |
| Theming | 3 | Validated tokens and nine manifests work across merchant data. A large legacy family stylesheet plus variant overrides makes cascade maintenance fragile. |
| Implementation integrity | 1 | All routes exist, but the nine themes do not reproduce the approved image compositions or their distinctive shopping journeys. |
| **Total** | **12 / 20** | **Acceptable code foundation; design conversion fails acceptance.** |

## Page inventory

The handoff names 12 core page types. The later Favorites requirement makes **13**. All 13 have real route handlers: home, shop, collection, product, About, Contact, search, Favorites, cart, checkout, confirmation, tracking, and policies (privacy, terms, shipping, returns). Standard 404 and error screens also exist. Shared commerce behavior is implemented once. About and Contact now share a consistent structure across themes.

The additional modules remain open: FAQ, account/order history, journal, promotions, lookbook, booking, gift finder, comparison, compatibility, and wardrobe finder. Account/order history requires the main platform's session and order authorization. Live checkout, payment confirmation, stock validation and tracking likewise require the authoritative backend. The demo correctly avoids claiming real orders or payments.

## Prototype alignment

| Theme | Approved concept | Current template gap |
| --- | --- | --- |
| M1 Caring Journal | Full-width parent/baby campaign, stage shortcuts, editorial categories | Clean campaign, four stage paths, three editorial collection banners and three curated newborn product shots now exist; reassurance strip and deeper catalog content still diverge |
| M2 Playroom Map | Collage hero, bright category cards, gift finder | Two-column hero and generic collections; no gift finder |
| M3 Parent's Checklist | Need/stage navigation, registry and detailed product cards | Standard hero and grid; no guided checklist or registry |
| G1 Cinematic Object | Dark full-width product stage, specs, comparison | Dark palette exists; product-led stage and comparison are missing |
| G2 Product Lab | Product/spec montage, use-case paths, compatibility and compare | Clean product montage and real use-case paths now exist; mobile composition, spec cards, compatibility and compare are missing |
| G3 Electric Culture | Three-part campaign and creator/gaming paths | Basic split hero and generic category grid |
| C1 Atelier | Full-width fashion campaign and curated product edit | Editorial hero exists; composition, imagery and edit layout diverge |
| C2 Fashion Issue | Oversized magazine collage and mood-led shopping | Split hero and ordinary product grid |
| C3 Wardrobe Studio | Lifestyle campaign, occasion/size finder, complete looks | Clean lifestyle campaign and real occasion paths now exist; outfit and size model are missing |

The current mock catalog has only four to seven products per store and no attribute facets or variant/size model. A new multi-collection discovery relation supports stage, use and occasion links with real collection routes; it does not yet implement the richer finders in the screenshots. Clean, separate campaign images now replace the three live demo heroes, and M1's curated newborn products have matching photos. Other collection and product photography remains generic or mismatched. Those gaps cannot be solved reliably by theme CSS alone. The approved concept images are composite mockups; reusing them as page backgrounds would bake UI and text into imagery and make the templates hard to update.

## Prioritized engineering findings

1. **P0 — Misleading theme preview and incomplete concept parity.** `theme-registry.ts` points at approved screenshots while `Storefront.tsx` renders materially different pages. Build each concept's required modules from structured merchant data, then compare desktop and mobile captures before calling a theme complete.
2. **P1 — No production backend composition.** `getDemoSource()` deliberately fails closed in production. Implement the actual NestJS adapter, verified domain lookup, authenticated publishing, inventory/pricing and order/payment handoff before live use.
3. **P1 — Unbounded catalog snapshot and client search.** `getPublishedSnapshot()` returns every product; `assemblePage()` and `SearchResults` filter in memory. Add paginated backend catalog/search queries and a bounded homepage projection before large stores are supported.
4. **P1 — Missing product attributes for guided journeys.** Category membership, compatibility, age/stage, sizing and look composition need explicit validated contracts. The prototype's hardcoded ID filters are demo-only and must not enter the engine.
5. **P2 — Configuration compatibility.** A version-1 theme migration now maps the three known legacy IDs into version 2. Validate it against real published records during backend integration; unknown legacy shapes fail closed.
6. **P2 — Monolithic renderer and CSS cascade.** `Storefront.tsx` carries every page and theme-family branch; `storefront.css` and `theme-compositions.css` layer family and variant rules. Extract page components and bounded theme composition slots as the new merchandising modules are built.
7. **P2 — Remote image delivery.** Remote demo images remain unoptimized because their URLs already specify a bounded size. The three new local campaign images use Next's optimizer, but production needs merchant-approved assets through the platform's image pipeline.

## Fixes made during this audit

- Studio draft persistence now guards against briefly saving one merchant's draft under another merchant's key when switching stores.
- Favorites now uses one store-scoped provider subscription instead of attaching storage listeners for every product card.
- Mobile header has an accessible navigation menu and search form, so a merchant can add more navigation links without clipping them into a tiny row.
- Studio thumbnails now use sized, lazy Next images rather than full-size CSS background downloads.
- Storefront configuration is now version 2, with a narrow migration for the former `playful`, `precision`, and `editorial` IDs.
- Homepage discovery paths now come from tenant collections and support product membership in several collections. The links resolve to real filtered pages instead of demo-only hardcoded product IDs.
- Three new clean, text-free campaign images support the live M1, G2 and C3 demo storefronts. Four new M1 stage photos replace unrelated images. Hero labels and button copy are data fields, with button text editable in Studio; the hero image and supporting text remain independent elements.
- M1's featured row now uses three named newborn products with matching clean product photos; other catalog items remain available in shop and stage routes. A test guards that curated edit against accidentally pulling in the wider catalog.
- M1's former generic categories now use newborn, nursery and gifting slugs, descriptions and product memberships. The shared collection component gets an M1 banner composition through CSS; links lead to the categories they advertise.
- M1 and C3 keep editable copy over the campaign image on phones. Visual review found the C3 supporting text crossed the dark model, so its copy width and backdrop were tightened. G2 desktop imagery was shifted right after the headline collided with the laptop image. M1 phone stage shortcuts now form the compact four-item row shown in the approved concept.

## Verification

- `STOREFRONT_MODE=mock pnpm build`: passed after the final campaign, collection, copy and responsive changes.
- `pnpm typecheck`, `pnpm test` (19 tests), `pnpm lint:security`, and `git diff --check`: passed after the data and configuration changes. The final heading-copy change passed the production build, 19 tests, security check and diff check.
- Browser: inspected M1, G2 and C3 desktop and phone layouts. Verified the G2 desktop image no longer collides with the headline, the C3 phone paragraph computes to 210px and wraps on the light backdrop, M1 phone has four stage images, M1 collection banners and curated product cards render, and the mobile menu expands. The G2 phone composition and much of the catalog and guided shopping experience still miss approved details. Saved a favorite, opened `/favorites`, and verified that another merchant's Favorites page remained empty.

## Acceptance path

1. Define a versioned merchandising schema: campaign media, discovery paths, promotions, product facets/variants, and optional guided flows. Keep all content tenant-owned and validated.
2. Build the shared page and commerce components once; give each of the nine themes explicit composition choices for home, catalog, collection and product pages.
3. Produce clean campaign/product assets matching the approved art direction. Compare each theme against its desktop and mobile reference in a bounded visual QA pass.
4. Add meaningful journey tests for navigation, filters, Favorites, cart and variant selection; then integrate the real backend gateway and run load/security checks on representative catalog sizes.
