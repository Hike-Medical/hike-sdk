import { Prisma } from '../../../prisma';
import type { PagedParams } from '../PagedParams';

export interface GetProductsParams extends PagedParams {
  term?: string;
  minPrice?: number;
  maxPrice?: number;
  parentsOnly?: boolean;
  includeChildren?: boolean;
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
      | 'featured',
      string
    >
  >;
  sortBy?: 'name' | 'sku' | 'price' | 'featured' | 'createdAt' | 'updatedAt';
  sortOrder?: Prisma.SortOrder;
}
