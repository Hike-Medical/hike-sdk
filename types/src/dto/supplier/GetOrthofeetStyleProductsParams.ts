import { Prisma } from '../../../prisma';
import type { PagedParams } from '../PagedParams';

export interface GetOrthofeetStyleProductsParams extends PagedParams {
  supplierId: string;
  term?: string;
  categoryAttributeValue?: string;
  genderAttributeValue?: string;
  maxPrice?: number;
  sortOrder?: Prisma.SortOrder;
}
