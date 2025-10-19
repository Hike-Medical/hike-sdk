export interface ImportCatalogProductsResponse {
  productsParsed: number;
  productsProcessed: number;
  productsCreated: number;
  productsUpdated: number;
  productsSkipped: number;
  variantsParsed: number;
  variantsProcessed: number;
  variantsCreated: number;
  variantsUpdated: number;
  variantsSkipped: number;
  attributesParsed: number;
  attributesProcessed: number;
  attributesCreated: number;
  attributesUpdated: number;
  attributesSkipped: number;
  manufacturersCreated: string[];
  parsingErrors: string[];
  processingErrors: string[];
}
