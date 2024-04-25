import type { Role } from '../../prisma';

export interface AuthUser {
  id: string;
  email: string | null;
  companies: Record<string, Role>;
}
