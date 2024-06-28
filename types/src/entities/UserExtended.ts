import type { Company, CompanyUser, CompanyUserPermission, User } from '../../prisma';

export type UserExtended = User & {
  companies: (CompanyUser & {
    company: Company;
  })[];
  permissions: CompanyUserPermission[];
};
