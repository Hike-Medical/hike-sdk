import type { AgreementStatus, AgreementType, CompanyPermission, CompanyRole } from '../../prisma';

export interface AuthUser {
  id: string;
  companies: Record<string, CompanyRole | null>;
  patients?: Record<string, string>;
  permissions: Record<string, Record<CompanyPermission, CompanyRole>>;
  slugs: Record<string, string>;
  agreements: Record<AgreementType, AgreementStatus>;
  expiresAt: Date;
}
