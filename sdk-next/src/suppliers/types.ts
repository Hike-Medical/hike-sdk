import { ReactElement } from 'react';

/**
 * Base configuration that all supplier configs should extend
 */
export interface BaseSupplierConfig {
  supplierId: string;
}

/**
 * Standard supplier catalog component props
 */
export interface SupplierCatalogProps {
  selectedSku?: string;
  isLoading?: boolean;
  onAddToCart: (sku: string, name: string, metadata?: Record<string, unknown>) => void;
  onRemove?: () => void;
}

/**
 * Standard supplier review component props
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

/**
 * Supplier adapter return type - provides everything needed to integrate a supplier
 */
export interface SupplierAdapter {
  /**
   * Supplier configuration
   */
  config: {
    supplierId: string;
    formFieldMappings: Record<string, string>;
  };

  /**
   * Pre-configured catalog component ready to render
   */
  catalog: ReactElement | null;

  /**
   * Handlers for cart operations
   */
  handlers: {
    onAddToCart: (variantSku: string, variantName: string, metadata?: Record<string, unknown>) => void;
    onRemove: () => void;
  };

  /**
   * Whether a product is currently selected
   */
  isProductSelected: boolean;

  /**
   * Loading state for supplier-specific operations
   */
  isLoading: boolean;

  /**
   * Error state
   */
  error?: Error | null;
}

/**
 * Parameters for supplier adapters
 */
export interface SupplierAdapterParams {
  supplierId: string;
  workbenchId: string;
  schemaId: string;
}
