import { CompanyRole, Prisma } from '../../../prisma/index';
import type { PagedParams } from '../PagedParams';

export interface GetUsersParams extends PagedParams {
  userIds?: string[];
  excludedRoles?: CompanyRole[];
  excludedUnverified?: boolean;
  filter?: Partial<Record<'id' | 'email' | 'clinician' | 'role' | 'active', string>>;
  sortBy?: 'email' | 'clinician' | 'createdAt' | 'updatedAt';
  sortOrder?: Prisma.SortOrder;
}
