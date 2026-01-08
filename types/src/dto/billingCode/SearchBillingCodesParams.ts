import { Prisma } from '../../../prisma';
import type { PagedParams } from '../PagedParams';

export interface SearchBillingCodesParams extends PagedParams {
  term?: string;
  isFavorite?: boolean;
  sortBy?: 'id' | 'summary' | 'description';
  sortOrder?: Prisma.SortOrder;
}
