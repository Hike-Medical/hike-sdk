export interface EnrollPatientsParams {
  patientIds?: string[];
  status?: 'ALL' | 'ACTIVE' | 'INACTIVE';
  tags?: string[];
  onlyExternalId?: boolean;
  allowResend?: boolean;
  search?: string;
}
