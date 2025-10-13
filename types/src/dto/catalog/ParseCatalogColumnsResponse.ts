import { CatalogCsvRecord } from './ImportCatalogProductsParams';

export interface ParseCatalogColumnsResponse {
  columns: string[];
  suggested: Partial<Record<keyof CatalogCsvRecord, string>>;
}
