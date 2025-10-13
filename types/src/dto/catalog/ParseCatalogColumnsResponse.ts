import { CatalogProductCsvRecord } from './CatalogProductCsvRecord';

export interface ParseCatalogColumnsResponse {
  columns: string[];
  suggested: Partial<Record<keyof CatalogProductCsvRecord, string>>;
}
