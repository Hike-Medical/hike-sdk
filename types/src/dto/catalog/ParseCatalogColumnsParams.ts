import { CatalogFileType } from './CatalogFileType';

export interface ParseCatalogColumnsParams {
  fileKey: string;
  bucketName?: string;
  fileType: CatalogFileType;
  supplierId?: string;
}
