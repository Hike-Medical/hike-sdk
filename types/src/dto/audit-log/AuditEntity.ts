export const AuditEntity = {
  COMPANY: 'COMPANY',
  PATIENT: 'PATIENT',
  EVALUATION: 'EVALUATION',
  WORKBENCH: 'WORKBENCH',
  ORDER: 'ORDER',
  INVITATION: 'INVITATION',
  ROSTER: 'ROSTER',
  PHYSICIAN: 'PHYSICIAN',
  ACCOUNT: 'ACCOUNT',
  API_KEY: 'API_KEY',
  WORKFLOW: 'WORKFLOW',
  CATALOG: 'CATALOG',
  PRINT_JOB: 'PRINT_JOB'
} as const;

export type AuditEntity = (typeof AuditEntity)[keyof typeof AuditEntity];
