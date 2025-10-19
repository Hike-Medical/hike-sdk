import { Prisma } from '../../../prisma';
import type { PagedParams } from '../PagedParams';

export interface GetProductsParams extends PagedParams {
  filter?: Partial<
    Record<
      'term' | 'categoryId' | 'manufacturerId' | 'supplierId' | 'deviceTypeId' | 'billingCode' | 'active' | 'favorite',
      string
    >
  >;
  minPrice?: number;
  maxPrice?: number;
  includeVariants?: boolean;
  sortBy?: 'name' | 'sku' | 'price' | 'favorite' | 'createdAt' | 'updatedAt';
  sortOrder?: Prisma.SortOrder;
}
