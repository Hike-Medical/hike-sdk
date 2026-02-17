import type { OrderStatus, Prisma } from '../../../prisma';
import type { PagedParams } from '../PagedParams';

export interface GetCatalogOrdersParams extends PagedParams {
  companyId?: string;
  statuses?: OrderStatus[];
  sortBy?: 'createdAt' | 'status' | 'companyName';
  sortOrder?: Prisma.SortOrder;
}
