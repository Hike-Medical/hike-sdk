import type {
  Agreement,
  Clinician,
  Company,
  CompanyPatient,
  CompanyUser,
  User,
  UserAgreement,
  UserPermission
} from '../../prisma';

export type UserExtended = User & {
  companies: (CompanyUser & {
    company: Company;
  })[];
  permissions: UserPermission[];
  clinician: Clinician | null;
  patients: CompanyPatient[] | null;
  agreements: (UserAgreement & {
    agreement: Agreement;
  })[];
};
