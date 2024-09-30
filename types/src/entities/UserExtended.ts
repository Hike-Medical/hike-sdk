import type {
  Agreement,
  Clinician,
  Company,
  CompanyUser,
  Department,
  DepartmentUser,
  User,
  UserAgreement
} from '../../prisma';

export type UserExtended = User & {
  companies: (CompanyUser & {
    company: Company;
  })[];
  departments: (DepartmentUser & {
    department: Department;
  })[];
  clinician: Clinician | null;
  agreements: (UserAgreement & {
    agreement: Agreement;
  })[];
};
