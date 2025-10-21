/**
 * Represents a CSV record for a catalog product attribute import.
 */
export interface CatalogProductAttributeCsvRecord {
  'External ID': string;
  Type: string;
  Value: string;
  Key?: string | null;
  Description?: string | null;
}
