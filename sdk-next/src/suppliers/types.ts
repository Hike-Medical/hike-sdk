/**
 * Generic supplier configuration interface that all suppliers should implement
 */
export interface SupplierConfig {
  supplierId: string;
  formFieldMappings: Record<string, string>;
}

/**
 * Standard supplier catalog props
 */
export interface SupplierCatalogProps {
  supplierId: string;
  onAddToCart: (sku: string, name: string, metadata?: Record<string, unknown>) => void;
  isLoading?: boolean;
}

/**
 * Standard supplier review props
 */
export interface SupplierReviewProps {
  sku: string;
  supplierId: string;
}

/**
 * Supplier product for review display
 */
export interface SupplierProduct {
  sku: string;
  supplierId: string;
  name?: string;
  image?: string;
  price?: number;
}
