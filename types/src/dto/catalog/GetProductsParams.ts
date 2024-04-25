import { Prisma } from '../../../prisma';
import type { PagedParams } from '../PagedParams';

export interface GetProductsParams extends PagedParams {
  sortBy?: 'name' | 'createdAt' | 'updatedAt';
  sortOrder?: Prisma.SortOrder;
}
