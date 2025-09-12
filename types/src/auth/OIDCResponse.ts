/**
 * Represents the needsInfo payload returned when additional user information is required
 * during OIDC/OAuth2 authentication flow.
 */
export interface OIDCResponse {
  needsInfo: true;
  accessToken: string;
  patientId?: string;
  facilityId?: string;
  suggested?: Partial<{
    email: string;
    firstName: string;
    lastName: string;
    birthDate: string;
  }>;
  required: string[];
}
