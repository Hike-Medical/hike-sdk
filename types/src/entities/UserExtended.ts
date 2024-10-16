import type { Agreement, Clinician, Company, CompanyUser, DepartmentUser, User, UserAgreement } from '../../prisma';

export type UserExtended = User & {
  companies: (CompanyUser & {
    company: Company;
  })[];
  departments: DepartmentUser[];
  clinician: Clinician | null;
  agreements: (UserAgreement & {
    agreement: Agreement;
  })[];
};
