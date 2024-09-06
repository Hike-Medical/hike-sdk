import type { Company, CompanyUser, DepartmentUser, FacilityUser, User } from '../../prisma';

export type UserExtended = User & {
  companies: (CompanyUser & {
    company: Company;
  })[];
  facilities: FacilityUser[];
  departments: DepartmentUser[];
};
