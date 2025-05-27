export const AuditAction = {
  CREATE: 'CREATE',
  RETRIEVE: 'RETRIEVE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  IMPORT: 'IMPORT',
  NOTIFY: 'NOTIFY',
  LOGIN_FAILED: 'LOGIN_FAILED'
} as const;

export type AuditAction = (typeof AuditAction)[keyof typeof AuditAction];
