import { CatalogFileType } from './CatalogFileType';

export interface GenerateCatalogUploadLinkParams {
  fileName: string;
  fileExtension: 'csv' | 'xlsx';
  fileType: CatalogFileType;
}
