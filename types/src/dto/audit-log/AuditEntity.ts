export const AuditEntity = {
  COMPANY: 'COMPANY',
  PATIENT: 'PATIENT',
  EVALUATION: 'EVALUATION',
  WORKBENCH: 'WORKBENCH',
  ORDER: 'ORDER',
  INVITATION: 'INVITATION',
  ROSTER: 'ROSTER',
  API_KEY: 'API_KEY',
  PHYSICIAN: 'PHYSICIAN'
} as const;

export type AuditEntity = (typeof AuditEntity)[keyof typeof AuditEntity];
