import { Prisma } from '../../../prisma/index';
import type { PagedParams } from '../PagedParams';

export interface SearchBillingCodesParams extends PagedParams {
  term: string;
  sortBy?: 'id' | 'summary' | 'description';
  sortOrder?: Prisma.SortOrder;
}
