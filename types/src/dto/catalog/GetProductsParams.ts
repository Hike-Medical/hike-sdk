import { Prisma } from '../../../prisma';
import type { PagedParams } from '../PagedParams';

export interface GetProductsParams extends PagedParams {
  term?: string;
  categoryId?: string;
  vendorId?: string;
  deviceTypeId?: string;
  billingCode?: string;
  sortBy?: 'name' | 'createdAt' | 'updatedAt';
  sortOrder?: Prisma.SortOrder;
}
