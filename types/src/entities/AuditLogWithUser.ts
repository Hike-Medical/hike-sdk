import type { AuditLog, User } from '../../prisma';

export interface AuditLogWithUser extends AuditLog {
  user?: User | null;
}
