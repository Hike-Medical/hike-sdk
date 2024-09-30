import type { AgreementStatus, AgreementType, CompanyDepartment, CompanyRole } from '../../prisma';

export interface AuthUser {
  id: string;
  companies: Record<string, CompanyRole>;
  departments: Record<string, Record<CompanyDepartment, CompanyRole>>;
  slugs: Record<string, string>;
  agreements: Record<AgreementType, AgreementStatus>;
  expiresAt: Date;
}
