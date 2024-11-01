import { CompanyRole } from '../../../prisma';
import type { PagedParams } from '../PagedParams';

export interface GetUsersParams extends PagedParams {
  userIds?: string[];
  excludedRoles?: CompanyRole[];
  excludedUnverified?: boolean;
}
