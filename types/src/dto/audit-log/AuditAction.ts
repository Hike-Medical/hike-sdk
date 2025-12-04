export const AuditAction = {
  CREATE: 'CREATE',
  RETRIEVE: 'RETRIEVE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  IMPORT: 'IMPORT',
  NOTIFY: 'NOTIFY',
  LOGIN_FAILED: 'LOGIN_FAILED',
  CONSOLIDATE_PATIENT: 'CONSOLIDATE_PATIENT'
} as const;

export type AuditAction = (typeof AuditAction)[keyof typeof AuditAction];
