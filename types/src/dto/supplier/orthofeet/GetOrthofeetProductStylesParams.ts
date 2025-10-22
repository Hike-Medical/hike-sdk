import { Prisma } from '../../../../prisma';
import type { PagedParams } from '../../PagedParams';

export interface GetOrthofeetProductStylesParams extends PagedParams {
  supplierId: string;
  term?: string;
  categoryValue?: string;
  genderValue?: string;
  maxPrice?: number;
  sortBy?: 'name' | 'price' | 'featured' | 'createdAt' | 'updatedAt';
  sortOrder?: Prisma.SortOrder;
}
