import { ProductType } from '../../../prisma';
import type { PagedParams } from '../PagedParams';

export interface GetOrdersByTypeParams extends PagedParams {
  searchQuery?: string;
  productTypes?: ProductType[];
}
