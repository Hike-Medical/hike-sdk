import type { Clinician, Company, CompanyUser, DepartmentUser, FacilityUser, User } from '../../prisma';

export type UserExtended = User & {
  companies: (CompanyUser & {
    company: Company;
  })[];
  facilities: FacilityUser[];
  departments: DepartmentUser[];
  clinician: Clinician | null;
};
