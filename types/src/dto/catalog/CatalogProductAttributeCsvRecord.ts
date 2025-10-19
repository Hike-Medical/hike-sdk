/**
 * Represents a CSV record for a catalog product attribute import.
 */
export interface CatalogProductAttributeCsvRecord {
  'External ID': string;
  Type: string;
  Key?: string | null;
  Value: string;
}
