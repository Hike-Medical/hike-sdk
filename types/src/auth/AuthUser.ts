import type { AgreementStatus, AgreementType, CompanyPermission, CompanyRole } from '@prisma/client';

export interface AuthUser {
  id: string;
  email: string | null;
  phone: string | null;
  companies: Record<string, CompanyRole | null>;
  patients?: Record<string, string>;
  permissions: Record<string, Record<CompanyPermission, CompanyRole>>;
  slugs: Record<string, string>;
  agreements: Record<AgreementType, AgreementStatus>;
  createdAt: Date;
  updatedAt: Date;
}
