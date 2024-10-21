import type { Agreement, Clinician, Company, CompanyUser, User, UserAgreement, UserPermission } from '../../prisma';

export type UserExtended = User & {
  companies: (CompanyUser & {
    company: Company;
  })[];
  permissions: UserPermission[];
  clinician: Clinician | null;
  agreements: (UserAgreement & {
    agreement: Agreement;
  })[];
};
