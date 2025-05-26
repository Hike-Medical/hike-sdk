import { CompanyPermission } from '../../../prisma';

export const CompanyPermissionList = [
  'MANUFACTURING',
  'PRINT_FARM',
  'SHIPPING',
  'STATIONS'
] satisfies CompanyPermission[];
