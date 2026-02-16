import type { OrderStatus, Prisma } from '../../../prisma';
import type { PagedParams } from '../PagedParams';
import type { SampleKitFulfillmentType } from './CreateSampleKitOrderParams';

export interface GetSampleKitOrdersParams extends PagedParams {
  companyId?: string;
  statuses?: OrderStatus[];
  fulfillmentType?: SampleKitFulfillmentType;
  sortBy?: 'createdAt' | 'status' | 'companyName';
  sortOrder?: Prisma.SortOrder;
}
