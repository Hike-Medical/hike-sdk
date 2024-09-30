import type {
  Agreement,
  Clinician,
  Company,
  CompanyUser,
  DepartmentUser,
  FacilityUser,
  User,
  UserAgreement
} from '../../prisma';

export type UserExtended = User & {
  companies: (CompanyUser & {
    company: Company;
  })[];
  facilities: FacilityUser[];
  departments: DepartmentUser[];
  clinician: Clinician | null;
  agreements: (UserAgreement & {
    agreement: Agreement;
  })[];
};
