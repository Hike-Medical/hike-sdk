import { CompanyPermission, CompanyRole } from '../../../prisma';

export interface UpsertPermissionsParams {
  permissions?: CompanyPermission[];
  role?: CompanyRole;
}
