/**
 * Represents a CSV record for a catalog product import.
 */
export interface CatalogProductCsvRecord {
  'External ID': string;
  SKU: string;
  Name: string;
  Description?: string | null;
  Caption?: string | null;
  Barcode?: string | null;
  Image?: string | null;
  Price?: string | null;
  Active?: string | null;
  Favorite?: string | null;
  Manufacturer?: string | null;
  'Created At'?: string | null;
  'Updated At'?: string | null;
}
