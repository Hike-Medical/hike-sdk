import { CatalogProductAttributeCsvRecord } from './CatalogProductAttributeCsvRecord';
import { CatalogProductCsvRecord } from './CatalogProductCsvRecord';
import { CatalogProductVariantCsvRecord } from './CatalogProductVariantCsvRecord';

export interface ParseCatalogProductColumnsResponse {
  columns: string[];
  suggested: Partial<Record<keyof CatalogProductCsvRecord, string>>;
}

export interface ParseCatalogVariantColumnsResponse {
  columns: string[];
  suggested: Partial<Record<keyof CatalogProductVariantCsvRecord, string>>;
}

export interface ParseCatalogAttributeColumnsResponse {
  columns: string[];
  suggested: Partial<Record<keyof CatalogProductAttributeCsvRecord, string>>;
}

export type ParseCatalogColumnsResponse =
  | ParseCatalogProductColumnsResponse
  | ParseCatalogVariantColumnsResponse
  | ParseCatalogAttributeColumnsResponse;
