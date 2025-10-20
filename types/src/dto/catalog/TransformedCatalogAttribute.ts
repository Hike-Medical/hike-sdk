import { ProductAttributeType } from '../../../prisma';

/**
 * Represents a validated and transformed catalog attribute ready for database operations.
 */
export interface TransformedCatalogAttribute {
  productId: string;
  type: ProductAttributeType;
  value: string;
  description?: string;
}
