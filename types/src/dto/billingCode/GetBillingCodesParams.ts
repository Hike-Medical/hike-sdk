import { Prisma } from '@prisma/client';
import type { PagedParams } from '../PagedParams';

export interface GetBillingCodesParams extends PagedParams {
  codes: string[];
  sortBy?: 'id' | 'summary' | 'description';
  sortOrder?: Prisma.SortOrder;
}
