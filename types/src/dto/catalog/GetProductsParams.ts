import { Prisma } from '../../../prisma';
import type { PagedParams } from '../PagedParams';

export interface GetProductsParams extends PagedParams {
  term?: string;
  minPrice?: number;
  maxPrice?: number;
  includeVariants?: boolean;
  filter?: Partial<
    Record<
      | 'id'
      | 'externalId'
      | 'name'
      | 'sku'
      | 'categoryId'
      | 'manufacturerId'
      | 'supplierId'
      | 'deviceTypeId'
      | 'billingCode'
      | 'active'
      | 'favorite',
      string
    >
  >;
  sortBy?: 'name' | 'sku' | 'price' | 'favorite' | 'createdAt' | 'updatedAt';
  sortOrder?: Prisma.SortOrder;
}
