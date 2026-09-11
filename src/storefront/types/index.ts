/**
 * Barrel re-export for all storefront types.
 * Consuming code imports from '@/storefront/types' rather than individual files.
 */

export type {
  TemplateId,
  ThemeDarkOverrides,
  ThemeTokens,
  SectionDataSource,
  SectionInstance,
  StoreMetadata,
  StoreConfig,
} from './store';

export type {
  ProductColor,
  ProductVariant,
  ProductSize,
  ProductSpec,
  ProductSpecCategory,
  ProductFeature,
  ProductReview,
  ProductFAQ,
  ProductImage,
  ProductBadge,
  Availability,
  CurrencyCode,
  Product,
  CartItem,
  WishlistItem,
} from './product';

export type { TemplateMetadata } from './template';
