import { CatalogProductAttributeCsvRecord } from './CatalogProductAttributeCsvRecord';
import { CatalogProductCsvRecord } from './CatalogProductCsvRecord';
import { CatalogProductVariantCsvRecord } from './CatalogProductVariantCsvRecord';

export type CatalogCsvRecord =
  | CatalogProductCsvRecord
  | CatalogProductVariantCsvRecord
  | CatalogProductAttributeCsvRecord;

export interface ImportCatalogProductsParams {
  productsFileKey?: string;
  variantsFileKey?: string;
  attributesFileKey?: string;
  bucketName?: string;
  supplierId: string;
  productsColumnMapping?: Partial<Record<keyof CatalogProductCsvRecord, string>>;
  variantsColumnMapping?: Partial<Record<keyof CatalogProductVariantCsvRecord, string>>;
  attributesColumnMapping?: Partial<Record<keyof CatalogProductAttributeCsvRecord, string>>;
}
