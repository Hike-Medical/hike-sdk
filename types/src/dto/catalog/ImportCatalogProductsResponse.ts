export interface ImportCatalogProductsResponse {
  parsed: number;
  productsProcessed: number;
  skipped: number;
  manufacturersCreated: string[];
  parsingErrors: string[];
  processingErrors: string[];
}
