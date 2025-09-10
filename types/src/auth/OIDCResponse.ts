export interface OIDCResponse {
  needsInfo: true;
  accessToken: string;
  patientId?: string;
  facilityId?: string;
  suggested?: Partial<{ email: string; firstName: string; lastName: string; birthDate: string }>;
  required: string[];
}
