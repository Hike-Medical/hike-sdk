import type { AuthenticationStatus, CompanyPatient, Evaluation, Patient, User } from '@hike/types';

/**
 * Enrollment state representing the current step in the enrollment process
 */
export type EnrollmentState =
  | 'TOKEN_INVALID'
  | 'NEEDS_DETAILS'
  | 'NEEDS_CONTACT_VERIFICATION'
  | 'NEEDS_OTP_VERIFICATION'
  | 'NEEDS_EMPLOYMENT_VERIFICATION'
  | 'READY_FOR_EVALUATION';

/**
 * Result of enrollment state evaluation
 */
export interface EnrollmentStateResult {
  state: EnrollmentState;
  canProceed: boolean;
  nextPath?: string;
  reason?: string;
}

/**
 * Parameters for determining enrollment navigation
 */
export interface EnrollmentNavigationParams {
  patientId: string;
  workbenchId: string;
  isApproved: boolean;
  skipExternalIdVerification?: boolean;
  redirectUrl?: string;
  formSchemaId: string;
  slugPath?: string;
}

/**
 * Parameters for determining if OTP verification is needed
 */
export interface OTPVerificationParams {
  user?: Pick<User, 'phone' | 'phoneVerifiedAt' | 'email' | 'emailVerifiedAt'> | null;
  phone?: string | null;
  email?: string | null;
}

/**
 * Session validation result
 */
export interface SessionValidationResult {
  isValid: boolean;
  requiresLogout: boolean;
  reason?: string;
}

/**
 * Determines if a user session is valid for the given invitation
 */
export function validateSessionForInvitation(params: {
  currentUser?: Pick<User, 'id'> | null;
  invitationUserId?: string | null;
  authStatus: AuthenticationStatus;
}): SessionValidationResult {
  const { currentUser, invitationUserId, authStatus } = params;

  // If not authenticated, session is valid for new enrollment
  if (authStatus === 'UNAUTHENTICATED') {
    return { isValid: true, requiresLogout: false };
  }

  // If authenticated but no current user, session is invalid
  if (authStatus === 'AUTHENTICATED' && !currentUser) {
    return { 
      isValid: false, 
      requiresLogout: false,
      reason: 'Authenticated but no user found'
    };
  }

  // If invitation has a user and it doesn't match current user, requires logout
  if (currentUser && invitationUserId && currentUser.id !== invitationUserId) {
    return {
      isValid: false,
      requiresLogout: true,
      reason: 'User mismatch - invitation belongs to different user'
    };
  }

  return { isValid: true, requiresLogout: false };
}

/**
 * Determines if OTP verification is required based on contact verification status
 */
export function requiresOTPVerification(params: OTPVerificationParams): boolean {
  const { user, phone, email } = params;

  if (!user) {
    return false;
  }

  // Check if phone needs verification
  const hasUnverifiedPhone = (phone || user.phone) && !user.phoneVerifiedAt;
  
  // Check if email needs verification
  const hasUnverifiedEmail = (email || user.email) && !user.emailVerifiedAt;

  return hasUnverifiedPhone || hasUnverifiedEmail;
}

/**
 * Determines the next navigation path after contact verification or OTP
 */
export function determineEnrollmentNavigationPath(params: EnrollmentNavigationParams): string {
  const {
    patientId,
    workbenchId,
    isApproved,
    skipExternalIdVerification,
    redirectUrl,
    formSchemaId,
    slugPath = ''
  } = params;

  // If there's a custom redirect and invitation is approved, use it
  if (redirectUrl && isApproved) {
    return redirectUrl;
  }

  const basePath = `${slugPath}/employee/${patientId}/workbench/${workbenchId}`;

  // If approved or external ID verification is skipped, go to form
  if (isApproved || skipExternalIdVerification) {
    return `${basePath}/form/${formSchemaId}/0`;
  }

  // Otherwise, need to verify employment
  return `${basePath}/verify/id/`;
}

/**
 * Determines the contact type based on the contact string
 */
export function determineContactType(contact: string): 'EMAIL' | 'SMS' {
  return contact.includes('@') ? 'EMAIL' : 'SMS';
}

/**
 * Gets the unverified contact from user data
 * Prioritizes phone over email
 */
export function getUnverifiedContact(params: OTPVerificationParams): string | null {
  const { user } = params;

  if (!user) {
    return null;
  }

  // Check phone first
  if (user.phone && !user.phoneVerifiedAt) {
    return user.phone;
  }

  // Then check email
  if (user.email && !user.emailVerifiedAt) {
    return user.email;
  }

  return null;
}

/**
 * Checks if patient details are complete for enrollment
 */
export function hasCompletePatientDetails(
  patient: Pick<Patient, 'firstName' | 'lastName' | 'birthDate'> | null
): boolean {
  if (!patient) {
    return false;
  }

  return Boolean(patient.firstName && patient.lastName && patient.birthDate);
}

/**
 * Determines if an incomplete evaluation exists for the patient
 */
export function findIncompleteEvaluation(
  evaluations: Pick<Evaluation, 'id' | 'status'>[]
): Pick<Evaluation, 'id' | 'status'> | null {
  return evaluations.find((evaluation) => evaluation.status === 'INCOMPLETE') ?? null;
}

/**
 * Validates enrollment token format (basic validation)
 */
export function isValidTokenFormat(token: string | null | undefined): boolean {
  if (!token) {
    return false;
  }

  // Token should be a non-empty string with reasonable length
  const trimmed = token.trim();
  return trimmed.length >= 10 && trimmed.length <= 500;
}

/**
 * Determines the enrollment state based on various conditions
 */
export function determineEnrollmentState(params: {
  tokenValid: boolean;
  authStatus: AuthenticationStatus;
  patient: Pick<Patient, 'firstName' | 'lastName' | 'birthDate'> | null;
  companyPatient?: Pick<CompanyPatient, 'approvedAt'> | null;
  user?: Pick<User, 'phone' | 'phoneVerifiedAt' | 'email' | 'emailVerifiedAt'> | null;
}): EnrollmentStateResult {
  const { tokenValid, authStatus, patient, companyPatient, user } = params;

  // Invalid token
  if (!tokenValid) {
    return {
      state: 'TOKEN_INVALID',
      canProceed: false,
      reason: 'Invitation token is invalid or expired'
    };
  }

  // Patient details incomplete
  if (!hasCompletePatientDetails(patient)) {
    return {
      state: 'NEEDS_DETAILS',
      canProceed: false,
      reason: 'Patient details (name, birth date) are incomplete'
    };
  }

  // Not authenticated yet
  if (authStatus !== 'AUTHENTICATED') {
    return {
      state: 'NEEDS_DETAILS',
      canProceed: false,
      reason: 'User needs to complete enrollment form'
    };
  }

  // Check if contact verification is needed
  if (!user?.phone && !user?.email) {
    return {
      state: 'NEEDS_CONTACT_VERIFICATION',
      canProceed: false,
      reason: 'Contact information (phone or email) required'
    };
  }

  // Check if OTP verification is needed
  if (requiresOTPVerification({ user })) {
    return {
      state: 'NEEDS_OTP_VERIFICATION',
      canProceed: false,
      reason: 'Contact information needs to be verified via OTP'
    };
  }

  // Check if employment verification is needed
  if (!companyPatient?.approvedAt) {
    return {
      state: 'NEEDS_EMPLOYMENT_VERIFICATION',
      canProceed: false,
      reason: 'Employment verification required'
    };
  }

  // All checks passed
  return {
    state: 'READY_FOR_EVALUATION',
    canProceed: true
  };
}

