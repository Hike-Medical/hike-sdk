export const AuditAction = {
  CREATE: 'CREATE',
  RETRIEVE: 'RETRIEVE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  IMPORT: 'IMPORT',
  NOTIFY: 'NOTIFY',
  LOGIN_FAILED: 'LOGIN_FAILED',
  TAG_ADD: 'TAG_ADD',
  TAG_REMOVE: 'TAG_REMOVE'
} as const;

export type AuditAction = (typeof AuditAction)[keyof typeof AuditAction];
