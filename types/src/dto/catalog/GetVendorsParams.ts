import { Prisma } from '@prisma/client';
import type { PagedParams } from '../PagedParams';

export interface GetVendorsParams extends PagedParams {
  term?: string;
  sortBy?: 'name' | 'createdAt' | 'updatedAt';
  sortOrder?: Prisma.SortOrder;
}
