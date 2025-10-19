/**
 * Represents a CSV record for a catalog product variant import.
 */
export interface CatalogProductVariantCsvRecord {
  'External ID': string;
  'Parent External ID': string;
  SKU: string;
  Name: string;
  Description?: string | null;
  Caption?: string | null;
  Image?: string | null;
  Manufacturer?: string | null;
  'Children External IDs'?: string | null;
  'Created At'?: string | null;
  'Updated At'?: string | null;
}
