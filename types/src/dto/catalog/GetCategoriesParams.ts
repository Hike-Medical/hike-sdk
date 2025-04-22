import { Prisma } from '@prisma/client';
import type { PagedParams } from '../PagedParams';

export interface GetCategoriesParams extends PagedParams {
  parentId?: string | null;
  term?: string;
  sortBy?: 'name' | 'parentId' | 'createdAt' | 'updatedAt';
  sortOrder?: Prisma.SortOrder;
  vendorId?: string;
}
