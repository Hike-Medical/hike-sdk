import { AuthUser } from './AuthUser';

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

/**
 * Union type for OIDC user - either a complete AuthUser or needsInfo payload
 */
export type OidcUser = AuthUser | OIDCResponse;

/**
 * Type guard to check if an OidcUser is an AuthUser
 */
export const isOidcAuthUser = (user: OidcUser): user is AuthUser => {
  return !('needsInfo' in user);
};

/**
 * Type guard to check if an OidcUser is a needsInfo payload
 */
export const isOidcNeedsInfo = (user: OidcUser): user is OIDCResponse => {
  return 'needsInfo' in user;
};
