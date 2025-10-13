export interface ImportCatalogProductsResponse {
  productsParsed: number;
  productsProcessed: number;
  productsSkipped: number;
  variantsParsed: number;
  variantsProcessed: number;
  variantsSkipped: number;
  attributesParsed: number;
  attributesProcessed: number;
  attributesSkipped: number;
  manufacturersCreated: string[];
  parsingErrors: string[];
  processingErrors: string[];
}
