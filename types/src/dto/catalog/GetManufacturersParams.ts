import { Prisma } from '../../../prisma';
import type { PagedParams } from '../PagedParams';

export interface GetManufacturersParams extends PagedParams {
  term?: string;
  sortBy?: 'name' | 'createdAt' | 'updatedAt';
  sortOrder?: Prisma.SortOrder;
}
