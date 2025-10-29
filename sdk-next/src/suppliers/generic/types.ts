import type { CatalogProductExtended } from '@hike/sdk';

/**
 * Generic product extending CatalogProductExtended
 */
export type GenericProduct = CatalogProductExtended;

/**
 * Variant selection state
 */
export interface VariantSelectionState {
  selectedVariantId?: string;
  selectedVariantSku?: string;
  selectedVariantName?: string;
}

/**
 * Type guard to check if product has variants
 */
export const hasVariants = (product: CatalogProductExtended): boolean => {
  return (product.children?.length ?? 0) > 0;
};

/**
 * Type guard to check if product is a parent (has no parentId)
 */
export const isParentProduct = (product: CatalogProductExtended): boolean => {
  return !product.parentId;
};
