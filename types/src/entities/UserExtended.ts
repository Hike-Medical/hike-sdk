import type {
  Account,
  Agreement,
  Clinician,
  Company,
  CompanyPatient,
  CompanyUser,
  Patient,
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
  patients:
    | (CompanyPatient & {
        patient: Patient;
      })[]
    | null;
  agreements: (UserAgreement & {
    agreement: Agreement;
  })[];
  accounts: Pick<Account, 'profileId' | 'provider' | 'createdAt' | 'updatedAt'>[];
};
