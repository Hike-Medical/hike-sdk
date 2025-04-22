import { ProductType } from '../../../prisma/index';
import type { PagedParams } from '../PagedParams';

export interface GetOrdersByTypeParams extends PagedParams {
  searchQuery?: string;
  productTypes?: ProductType[];
  assignedOnly?: boolean;
}
