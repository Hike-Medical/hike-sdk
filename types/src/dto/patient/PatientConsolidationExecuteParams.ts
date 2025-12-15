export interface PatientConsolidationExecuteParams {
  fromPatientId: string;
  toPatientId: string;
  companyId: string;
  initiatedBy: 'USER' | 'ADMIN';
  adminUserId?: string;
}

