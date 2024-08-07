import type { CompanyPermission, CompanyRole, Facility } from '../../prisma';

export interface AuthUser {
  id: string;
  companies: Record<string, CompanyRole>;
  facilities: Record<string, Facility>;
  permissions: Record<string, Record<CompanyPermission, CompanyRole>>;
  slugs: Record<string, string>;
  expiresAt: Date;
}
