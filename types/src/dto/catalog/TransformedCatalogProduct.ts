/**
 * Represents a validated and transformed catalog product ready for database operations.
 */
export interface TransformedCatalogProduct {
  externalId: string;
  sku: string;
  name: string;
  description?: string;
  caption?: string;
  barcode?: string;
  image?: string;
  price?: number;
  active?: boolean;
  featured?: boolean;
  manufacturer?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
