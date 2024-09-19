import type { Clinician, Company, CompanyUser, DepartmentUser, User } from '../../prisma';

export type UserExtended = User & {
  companies: (CompanyUser & {
    company: Company;
  })[];
  departments: DepartmentUser[];
  clinician: Clinician | null;
};
