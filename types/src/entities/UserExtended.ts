import type { Company, CompanyUser, CompanyUserPermission, FacilityUser, User } from '../../prisma';

export type UserExtended = User & {
  companies: (CompanyUser & {
    company: Company;
  })[];
  facilities: FacilityUser[];
  permissions: CompanyUserPermission[];
};
