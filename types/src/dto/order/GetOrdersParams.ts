import type { OrderAuthorizationStatus, OrderStatus, Prisma, ProductType } from '../../../prisma';
import type { PagedParams } from '../PagedParams';

export interface GetOrdersParams extends PagedParams {
  statuses?: OrderStatus[];
  authorizationStatus?: OrderAuthorizationStatus;
  sortBy?: string;
  sortOrder?: Prisma.SortOrder;
  searchQuery?: string;
  productTypes?: ProductType[];
}
