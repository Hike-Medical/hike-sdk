import { TransformedCatalogProduct } from './TransformedCatalogProduct';

/**
 * Represents a validated and transformed catalog product variant ready for database operations.
 */
export interface TransformedCatalogProductVariant extends TransformedCatalogProduct {
  parentId: string;
}
