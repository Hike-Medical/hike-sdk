// Supplier types
export type {
  BaseSupplierConfig,
  SupplierAdapter,
  SupplierAdapterParams,
  SupplierCatalogProps,
  SupplierProduct,
  SupplierReviewProps
} from './types';

// Registry
export { SUPPLIER_ADAPTERS, getSupportedSupplierIds, isSupplierSupported } from './registry';

// Hooks
export { useSupplierAdapter } from './hooks/useSupplierAdapter';
export type { UseSupplierAdapterResult } from './hooks/useSupplierAdapter';

// Generic components
export { SupplierCatalogSelector } from './components/SupplierCatalogSelector';
export { SupplierReview } from './components/SupplierReview';

// Orthofeet exports
export * from './orthofeet';
