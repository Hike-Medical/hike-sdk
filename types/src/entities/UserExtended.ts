import type { Clinician, Company, CompanyUser, Department, DepartmentUser, User } from '../../prisma';

export type UserExtended = User & {
  companies: (CompanyUser & {
    company: Company;
  })[];
  departments: (DepartmentUser & {
    department: Department;
  })[];
  clinician: Clinician | null;
};
