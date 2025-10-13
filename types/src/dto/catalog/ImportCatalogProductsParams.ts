import { CatalogProductCsvRecord } from './CatalogProductCsvRecord';

export interface ImportCatalogProductsParams {
  fileKey: string;
  bucketName?: string;
  supplierId: string;
  columnMapping: Partial<Record<keyof CatalogProductCsvRecord, string>>;
}
