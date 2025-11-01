import { Prisma } from '../../../prisma';
import type { PagedParams } from '../PagedParams';

export interface GetSuppliersParams extends PagedParams {
  term?: string;
  ids?: string[]; // Filter by supplier IDs
  sortBy?: 'name' | 'createdAt' | 'updatedAt';
  sortOrder?: Prisma.SortOrder;
}
