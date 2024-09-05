import type { CompanyDepartment, CompanyRole } from '../../prisma';

export interface AuthUser {
  id: string;
  companies: Record<string, CompanyRole>;
  facilities: string[];
  departments: Record<string, Record<CompanyDepartment, CompanyRole>>;
  slugs: Record<string, string>;
  expiresAt: Date;
}
