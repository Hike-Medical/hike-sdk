import type { Role } from '../../prisma';

export interface AuthUser {
  id: string;
  companies: Record<string, Role>;
}
