import { Prisma } from '../../../prisma/index';
import type { PagedParams } from '../PagedParams';

export interface GetBillingCodesParams extends PagedParams {
  codes: string[];
  sortBy?: 'id' | 'summary' | 'description';
  sortOrder?: Prisma.SortOrder;
}
