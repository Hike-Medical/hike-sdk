import type { GetProductsParams } from './GetProductsParams';

export interface SearchProductsParams extends GetProductsParams {
  term: string;
}
