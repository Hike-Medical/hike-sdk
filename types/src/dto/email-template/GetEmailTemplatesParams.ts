import type { PagedParams } from '../PagedParams';

export interface GetEmailTemplatesParams extends PagedParams {
  search?: string;
  type?: 'EMAIL' | 'PAMPHLET_PRINT' | 'PAMPHLET_WEB';
  active?: boolean;
  sortBy?: 'title' | 'type' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}
