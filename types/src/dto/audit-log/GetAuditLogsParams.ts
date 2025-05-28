import { Prisma } from '../../../prisma';
import type { PagedParams } from '../PagedParams';

export interface GetAuditLogsParams extends PagedParams {
  filter?: Partial<Record<'companyId' | 'userId' | 'entityId' | 'entityType' | 'action', string>>;
  sortBy?: 'companyId' | 'userId' | 'entityId' | 'entityType' | 'action' | 'createdAt' | 'updatedAt';
  sortOrder?: Prisma.SortOrder;
}
