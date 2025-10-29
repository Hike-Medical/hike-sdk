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
export { getSupportedSupplierIds, isSupplierSupported, SUPPLIER_ADAPTERS } from './registry';

// Hooks
export { useSupplierAdapter } from './hooks/useSupplierAdapter';
export type { UseSupplierAdapterParams, UseSupplierAdapterResult } from './hooks/useSupplierAdapter';

// Shared catalog components
export * from './components';

// Generic adapter (fallback for unsupported suppliers)
export * from './generic';

// Orthofeet exports
export * from './orthofeet';
