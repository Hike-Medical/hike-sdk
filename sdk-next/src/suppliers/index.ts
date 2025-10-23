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

// Orthofeet exports
export * from './orthofeet';
