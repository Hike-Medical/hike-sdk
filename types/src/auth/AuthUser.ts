import type { CompanyRole } from '../../prisma';

export interface AuthUser {
  id: string;
  companies: Record<string, CompanyRole>;
}
