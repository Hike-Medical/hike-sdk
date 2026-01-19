import type { TemplateType } from '../../../prisma';
import type { PagedParams } from '../PagedParams';

export interface GetEmailTemplatesParams extends PagedParams {
  search?: string;
  type?: TemplateType;
  active?: boolean;
  sortBy?: 'title' | 'type' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}
