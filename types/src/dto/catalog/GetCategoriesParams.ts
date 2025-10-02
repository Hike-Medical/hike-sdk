import { Prisma } from '../../../prisma';
import type { PagedParams } from '../PagedParams';

export interface GetCategoriesParams extends PagedParams {
  term?: string;
  parentId?: string | null;
  supplierId?: string;
  manufacturerId?: string;
  sortBy?: 'name' | 'parentId' | 'createdAt' | 'updatedAt';
  sortOrder?: Prisma.SortOrder;
}
