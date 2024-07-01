import type { CompanyPermission, CompanyRole } from '../../prisma';

export interface AuthUser {
  id: string;
  companies: Record<string, CompanyRole>;
  permissions: Record<string, Record<CompanyPermission, CompanyRole>>;
  slugs: Record<string, string>;
  expiresAt: Date;
}
