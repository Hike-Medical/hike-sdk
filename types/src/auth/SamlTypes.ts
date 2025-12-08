import type { CompanyPreferences } from '../dto/preferences/CompanyPreferences';
import type { AuthUser } from './AuthUser';

/**
 * SAML 2.0 Authentication Types
 *
 * These types are used for SAML SSO authentication flow.
 */

/**
 * Extended AuthUser with optional patient ID for SAML assertions.
 */
export interface SamlUser extends AuthUser {
  patientId?: string;
}

/**
 * SAML Provider configuration interface.
 * Defines the settings needed to connect to a SAML Identity Provider.
 */
export interface SamlProviderConfig {
  /** IdP SSO URL - where to redirect users for authentication */
  entryPoint: string;
  /** SP Entity ID - our identifier as the Service Provider */
  issuer: string;
  /** IdP X.509 Certificate (PEM format) for signature validation */
  cert: string;
  /** Assertion Consumer Service URL - where IdP sends SAML responses */
  callbackUrl: string;
  /** Attribute name for patient/member ID (default: external_member_id) */
  patientClaim: string;
  /** Attribute name for facility/sponsor ID (default: sponsor_id) */
  facilityClaim: string;
  /** Optional: Private key for signing requests (PEM format) */
  privateKey?: string;
  /** Optional: Certificate for signing requests (PEM format) */
  privateCert?: string;
  /** Optional: Whether to sign authentication requests */
  signatureAlgorithm?: 'sha256' | 'sha512';
  /** Optional: Disable request signing (default: false) */
  disableRequestedAuthnContext?: boolean;
  /** Optional: Force authentication (default: false) */
  forceAuthn?: boolean;
  /** Optional: Allow IdP-initiated SSO (default: true) */
  allowIdpInitiated?: boolean;
}

/**
 * Context passed through the SAML flow for user provisioning.
 * Stored on the request object during authentication.
 */
export interface SamlContext {
  company: {
    id: string;
    name: string;
    slug: string;
    preferences: unknown;
  };
  provider: SamlProviderConfig;
  authPreferences: CompanyPreferences['auth'];
}

/**
 * Symbol key for storing SAML context on request objects.
 * This is used internally to pass context through the SAML flow.
 */
export const SAML_CONTEXT_KEY = Symbol('samlContext');
