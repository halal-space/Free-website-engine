/**
 * Store configuration types — the central data contract for storefront rendering.
 *
 * Defines StoreConfig (the top-level config blob fetched per-store),
 * ThemeTokens (design tokens driving CSS variable injection in Blueprint #10),
 * SectionInstance (the building blocks of composable page layouts), and
 * TemplateId (the discriminant that selects which template's components render).
 *
 * These types are the single source of truth for the API response shape from
 * GET /api/stores/{storeId}/config (Section 6.1 of Blueprint #1).
 */

// ── Template Identification ──────────────────────────────

/**
 * Discriminant union of supported template types.
 * Each value maps to a component namespace in the registry and a preset config.
 * Extensible as new templates are added — add a new union member here, a preset
 * in config/presets/, and register components in the registry.
 */
export type TemplateId =
  | 'gadget_aurelia'
  | 'gadget_aether'
  | 'fashion_atelier'
  | 'dining_ember_oak';

// ── Theme Tokens ─────────────────────────────────────────

/**
 * Dark-mode color overrides — same keys as the light-mode color tokens.
 * Optional `colorSecondary` because not all templates define a secondary color.
 * Blueprint #10 (Theming Engine) consumes these to set CSS custom properties
 * when `prefers-color-scheme: dark` or a manual toggle is active.
 */
export interface ThemeDarkOverrides {
  colorBackground: string;
  colorSurface: string;
  colorText: string;
  colorTextMuted: string;
  colorPrimary: string;
  colorPrimaryForeground: string;
  colorSecondary?: string;
  colorBorder: string;
  colorAccent: string;
}

/**
 * Complete set of design tokens for a store's visual identity.
 * Consumed by Blueprint #10 (Theming Engine) to inject CSS custom properties.
 * Font and color values are stored as raw CSS-ready strings (not token aliases)
 * because each store fully controls its own palette — no shared token scale.
 *
 * WCAG 2.2 AA constraint: Blueprint #10 must validate that colorText/colorBackground
 * pairs meet ≥4.5:1 contrast ratio for normal text, ≥3:1 for large text.
 */
export interface ThemeTokens {
  fontPrimary: string;
  fontDisplay?: string;
  fontEditorial?: string;
  colorBackground: string;
  colorSurface: string;
  colorText: string;
  colorTextMuted: string;
  colorPrimary: string;
  colorPrimaryForeground: string;
  colorSecondary?: string;
  colorBorder: string;
  colorAccent: string;
  borderRadius: string;
  supportsDarkMode: boolean;
  darkOverrides?: ThemeDarkOverrides;
}

// ── Section Composition ──────────────────────────────────

/**
 * Describes a dynamic data dependency for a section.
 * The storefront assembler (Blueprint #2) reads this to prefetch catalog data
 * and inject it as props into the resolved component.
 */
export interface SectionDataSource {
  type: 'products' | 'categories' | 'menu_items';
  filter?: string;
  limit?: number;
}

/**
 * A single composable section instance within a store's page layout.
 *
 * `componentId` is the registry lookup key (e.g. "shared:product_grid").
 * `props` is typed as Record<string, unknown> (not `any`) — consuming components
 * MUST validate/narrow props before rendering. Raw prop values must NEVER be
 * passed to dangerouslySetInnerHTML or equivalent (Security §8).
 *
 * `hidden` sections are skipped by the assembler — the registry is not consulted.
 */
export interface SectionInstance {
  blockId: string;
  componentId: string;
  order: number;
  hidden?: boolean;
  props: Record<string, unknown>;
  dataSource?: SectionDataSource;
}

// ── Store Metadata ───────────────────────────────────────

/**
 * SEO and metadata fields consumed by Blueprint #2's generateMetadata() to
 * produce <title>, <meta>, and Open Graph tags. All fields are optional because
 * a newly created store may not have them populated yet.
 */
export interface StoreMetadata {
  favicon?: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
}

// ── Store Configuration ──────────────────────────────────

/**
 * Top-level configuration for a single merchant's storefront.
 * This is the exact shape returned by GET /api/stores/{storeId}/config.
 * Fetched once per page render in the storefront assembler RSC (Blueprint #2)
 * and passed down as props — never refetched client-side.
 */
export interface StoreConfig {
  id: string;
  name: string;
  tagline?: string;
  templateId: TemplateId;
  domain: string;
  customDomain?: string | null;
  theme: ThemeTokens;
  sections: SectionInstance[];
  metadata: StoreMetadata;
}
