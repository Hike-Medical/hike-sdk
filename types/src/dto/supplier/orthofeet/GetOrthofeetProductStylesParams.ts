import { Prisma } from '../../../../prisma';
import type { PagedParams } from '../../PagedParams';

export interface GetOrthofeetProductStylesParams extends PagedParams {
  supplierId: string;
  term?: string;
  categoryAttributeValue?: string;
  genderAttributeValue?: string;
  maxPrice?: number;
  sortBy?: 'name' | 'price' | 'featured' | 'createdAt' | 'updatedAt';
  sortOrder?: Prisma.SortOrder;
}
