/**
 * Barrel re-export for the storefront service layer.
 */

export { getStoreConfig } from './store-service';
export { getStoreProducts, getStoreProduct } from './product-service';
export type { ProductListParams, ProductListResponse } from './product-service';
export { storeConfigTag, storeProductsTag, productTag } from './cache-tags';
export { StorefrontError, RegistryError } from './errors';
export type { StorefrontErrorCode } from './errors';
