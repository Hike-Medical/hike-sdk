import { describe, expect, test } from '@jest/globals';
import type { AuthenticationStatus, CompanyPatient, Evaluation, Patient, User } from '@hike/types';
import {
  determineContactType,
  determineEnrollmentNavigationPath,
  determineEnrollmentState,
  findIncompleteEvaluation,
  getUnverifiedContact,
  hasCompletePatientDetails,
  isValidTokenFormat,
  requiresOTPVerification,
  validateSessionForInvitation,
  type EnrollmentNavigationParams,
  type OTPVerificationParams
} from '../src/helpers/enrollmentUtils';

describe('enrollmentUtils', () => {
  describe('validateSessionForInvitation', () => {
    test('should return valid for unauthenticated users', () => {
      const result = validateSessionForInvitation({
        authStatus: 'UNAUTHENTICATED'
      });

      expect(result.isValid).toBe(true);
      expect(result.requiresLogout).toBe(false);
    });

    test('should return invalid when authenticated but no user', () => {
      const result = validateSessionForInvitation({
        authStatus: 'AUTHENTICATED',
        currentUser: null
      });

      expect(result.isValid).toBe(false);
      expect(result.requiresLogout).toBe(false);
      expect(result.reason).toContain('no user found');
    });

    test('should require logout when user mismatch', () => {
      const result = validateSessionForInvitation({
        authStatus: 'AUTHENTICATED',
        currentUser: { id: 'user-123' },
        invitationUserId: 'user-456'
      });

      expect(result.isValid).toBe(false);
      expect(result.requiresLogout).toBe(true);
      expect(result.reason).toContain('mismatch');
    });

    test('should return valid when user matches invitation', () => {
      const result = validateSessionForInvitation({
        authStatus: 'AUTHENTICATED',
        currentUser: { id: 'user-123' },
        invitationUserId: 'user-123'
      });

      expect(result.isValid).toBe(true);
      expect(result.requiresLogout).toBe(false);
    });

    test('should return valid when invitation has no userId', () => {
      const result = validateSessionForInvitation({
        authStatus: 'AUTHENTICATED',
        currentUser: { id: 'user-123' },
        invitationUserId: null
      });

      expect(result.isValid).toBe(true);
      expect(result.requiresLogout).toBe(false);
    });
  });

  describe('requiresOTPVerification', () => {
    test('should return false when no user', () => {
      const result = requiresOTPVerification({
        user: null
      });

      expect(result).toBe(false);
    });

    test('should return true when phone is unverified', () => {
      const result = requiresOTPVerification({
        user: {
          phone: '+1234567890',
          phoneVerifiedAt: null,
          email: null,
          emailVerifiedAt: null
        }
      });

      expect(result).toBe(true);
    });

    test('should return true when email is unverified', () => {
      const result = requiresOTPVerification({
        user: {
          phone: null,
          phoneVerifiedAt: null,
          email: 'test@example.com',
          emailVerifiedAt: null
        }
      });

      expect(result).toBe(true);
    });

    test('should return false when both contacts are verified', () => {
      const result = requiresOTPVerification({
        user: {
          phone: '+1234567890',
          phoneVerifiedAt: new Date(),
          email: 'test@example.com',
          emailVerifiedAt: new Date()
        }
      });

      expect(result).toBe(false);
    });

    test('should return true when only phone is verified but email exists', () => {
      const result = requiresOTPVerification({
        user: {
          phone: '+1234567890',
          phoneVerifiedAt: new Date(),
          email: 'test@example.com',
          emailVerifiedAt: null
        }
      });

      expect(result).toBe(true);
    });

    test('should return false when no contacts exist', () => {
      const result = requiresOTPVerification({
        user: {
          phone: null,
          phoneVerifiedAt: null,
          email: null,
          emailVerifiedAt: null
        }
      });

      expect(result).toBe(false);
    });

    test('should check phone parameter when provided', () => {
      const result = requiresOTPVerification({
        user: {
          phone: null,
          phoneVerifiedAt: null,
          email: null,
          emailVerifiedAt: null
        },
        phone: '+1234567890'
      });

      expect(result).toBe(true);
    });

    test('should check email parameter when provided', () => {
      const result = requiresOTPVerification({
        user: {
          phone: null,
          phoneVerifiedAt: null,
          email: null,
          emailVerifiedAt: null
        },
        email: 'test@example.com'
      });

      expect(result).toBe(true);
    });
  });

  describe('determineEnrollmentNavigationPath', () => {
    const baseParams: EnrollmentNavigationParams = {
      patientId: 'patient-123',
      workbenchId: 'workbench-456',
      isApproved: false,
      formSchemaId: 'form-schema-789'
    };

    test('should return redirect URL when approved and URL provided', () => {
      const result = determineEnrollmentNavigationPath({
        ...baseParams,
        isApproved: true,
        redirectUrl: '/custom/path'
      });

      expect(result).toBe('/custom/path');
    });

    test('should not use redirect URL when not approved', () => {
      const result = determineEnrollmentNavigationPath({
        ...baseParams,
        isApproved: false,
        redirectUrl: '/custom/path'
      });

      expect(result).not.toBe('/custom/path');
      expect(result).toContain('/verify/id/');
    });

    test('should return form path when approved', () => {
      const result = determineEnrollmentNavigationPath({
        ...baseParams,
        isApproved: true
      });

      expect(result).toContain('/form/form-schema-789/0');
      expect(result).toContain('patient-123');
      expect(result).toContain('workbench-456');
    });

    test('should return form path when skipExternalIdVerification is true', () => {
      const result = determineEnrollmentNavigationPath({
        ...baseParams,
        isApproved: false,
        skipExternalIdVerification: true
      });

      expect(result).toContain('/form/form-schema-789/0');
    });

    test('should return verify ID path when not approved and no skip', () => {
      const result = determineEnrollmentNavigationPath({
        ...baseParams,
        isApproved: false,
        skipExternalIdVerification: false
      });

      expect(result).toContain('/verify/id/');
      expect(result).toContain('patient-123');
      expect(result).toContain('workbench-456');
    });

    test('should include slugPath when provided', () => {
      const result = determineEnrollmentNavigationPath({
        ...baseParams,
        isApproved: true,
        slugPath: '/company-slug'
      });

      expect(result).toContain('/company-slug/');
    });
  });

  describe('determineContactType', () => {
    test('should return EMAIL for email addresses', () => {
      expect(determineContactType('test@example.com')).toBe('EMAIL');
      expect(determineContactType('user+tag@domain.co.uk')).toBe('EMAIL');
    });

    test('should return SMS for phone numbers', () => {
      expect(determineContactType('+1234567890')).toBe('SMS');
      expect(determineContactType('1234567890')).toBe('SMS');
    });
  });

  describe('getUnverifiedContact', () => {
    test('should return null when no user', () => {
      const result = getUnverifiedContact({ user: null });
      expect(result).toBeNull();
    });

    test('should prioritize unverified phone over email', () => {
      const result = getUnverifiedContact({
        user: {
          phone: '+1234567890',
          phoneVerifiedAt: null,
          email: 'test@example.com',
          emailVerifiedAt: null
        }
      });

      expect(result).toBe('+1234567890');
    });

    test('should return email when phone is verified', () => {
      const result = getUnverifiedContact({
        user: {
          phone: '+1234567890',
          phoneVerifiedAt: new Date(),
          email: 'test@example.com',
          emailVerifiedAt: null
        }
      });

      expect(result).toBe('test@example.com');
    });

    test('should return null when all contacts are verified', () => {
      const result = getUnverifiedContact({
        user: {
          phone: '+1234567890',
          phoneVerifiedAt: new Date(),
          email: 'test@example.com',
          emailVerifiedAt: new Date()
        }
      });

      expect(result).toBeNull();
    });

    test('should return null when no contacts exist', () => {
      const result = getUnverifiedContact({
        user: {
          phone: null,
          phoneVerifiedAt: null,
          email: null,
          emailVerifiedAt: null
        }
      });

      expect(result).toBeNull();
    });
  });

  describe('hasCompletePatientDetails', () => {
    test('should return false for null patient', () => {
      expect(hasCompletePatientDetails(null)).toBe(false);
    });

    test('should return true when all details are present', () => {
      const patient: Pick<Patient, 'firstName' | 'lastName' | 'birthDate'> = {
        firstName: 'John',
        lastName: 'Doe',
        birthDate: new Date('1990-01-01')
      };

      expect(hasCompletePatientDetails(patient)).toBe(true);
    });

    test('should return false when firstName is missing', () => {
      const patient = {
        firstName: null,
        lastName: 'Doe',
        birthDate: new Date('1990-01-01')
      } as Pick<Patient, 'firstName' | 'lastName' | 'birthDate'>;

      expect(hasCompletePatientDetails(patient)).toBe(false);
    });

    test('should return false when lastName is missing', () => {
      const patient = {
        firstName: 'John',
        lastName: null,
        birthDate: new Date('1990-01-01')
      } as Pick<Patient, 'firstName' | 'lastName' | 'birthDate'>;

      expect(hasCompletePatientDetails(patient)).toBe(false);
    });

    test('should return false when birthDate is missing', () => {
      const patient = {
        firstName: 'John',
        lastName: 'Doe',
        birthDate: null
      } as Pick<Patient, 'firstName' | 'lastName' | 'birthDate'>;

      expect(hasCompletePatientDetails(patient)).toBe(false);
    });
  });

  describe('findIncompleteEvaluation', () => {
    test('should return null for empty array', () => {
      expect(findIncompleteEvaluation([])).toBeNull();
    });

    test('should find incomplete evaluation', () => {
      const evaluations: Pick<Evaluation, 'id' | 'status'>[] = [
        { id: 'eval-1', status: 'COMPLETED' },
        { id: 'eval-2', status: 'INCOMPLETE' },
        { id: 'eval-3', status: 'SUBMITTED' }
      ];

      const result = findIncompleteEvaluation(evaluations);
      expect(result).not.toBeNull();
      expect(result?.id).toBe('eval-2');
    });

    test('should return null when no incomplete evaluations', () => {
      const evaluations: Pick<Evaluation, 'id' | 'status'>[] = [
        { id: 'eval-1', status: 'COMPLETED' },
        { id: 'eval-2', status: 'SUBMITTED' }
      ];

      expect(findIncompleteEvaluation(evaluations)).toBeNull();
    });

    test('should return first incomplete evaluation when multiple exist', () => {
      const evaluations: Pick<Evaluation, 'id' | 'status'>[] = [
        { id: 'eval-1', status: 'INCOMPLETE' },
        { id: 'eval-2', status: 'INCOMPLETE' }
      ];

      const result = findIncompleteEvaluation(evaluations);
      expect(result?.id).toBe('eval-1');
    });
  });

  describe('isValidTokenFormat', () => {
    test('should return false for null', () => {
      expect(isValidTokenFormat(null)).toBe(false);
    });

    test('should return false for undefined', () => {
      expect(isValidTokenFormat(undefined)).toBe(false);
    });

    test('should return false for empty string', () => {
      expect(isValidTokenFormat('')).toBe(false);
    });

    test('should return false for whitespace only', () => {
      expect(isValidTokenFormat('   ')).toBe(false);
    });

    test('should return false for too short tokens', () => {
      expect(isValidTokenFormat('short')).toBe(false);
    });

    test('should return true for valid length tokens', () => {
      expect(isValidTokenFormat('valid-token-123456')).toBe(true);
    });

    test('should return false for extremely long tokens', () => {
      const longToken = 'a'.repeat(501);
      expect(isValidTokenFormat(longToken)).toBe(false);
    });

    test('should trim whitespace before validation', () => {
      expect(isValidTokenFormat('  valid-token-123456  ')).toBe(true);
    });
  });

  describe('determineEnrollmentState', () => {
    const basePatient: Pick<Patient, 'firstName' | 'lastName' | 'birthDate'> = {
      firstName: 'John',
      lastName: 'Doe',
      birthDate: new Date('1990-01-01')
    };

    const baseUser: Pick<User, 'phone' | 'phoneVerifiedAt' | 'email' | 'emailVerifiedAt'> = {
      phone: '+1234567890',
      phoneVerifiedAt: new Date(),
      email: 'test@example.com',
      emailVerifiedAt: new Date()
    };

    const baseCompanyPatient: Pick<CompanyPatient, 'approvedAt'> = {
      approvedAt: new Date()
    };

    test('should return TOKEN_INVALID when token is invalid', () => {
      const result = determineEnrollmentState({
        tokenValid: false,
        authStatus: 'UNAUTHENTICATED',
        patient: basePatient
      });

      expect(result.state).toBe('TOKEN_INVALID');
      expect(result.canProceed).toBe(false);
      expect(result.reason).toContain('invalid');
    });

    test('should return NEEDS_DETAILS when patient details are incomplete', () => {
      const result = determineEnrollmentState({
        tokenValid: true,
        authStatus: 'AUTHENTICATED',
        patient: { ...basePatient, firstName: null }
      });

      expect(result.state).toBe('NEEDS_DETAILS');
      expect(result.canProceed).toBe(false);
      expect(result.reason).toContain('incomplete');
    });

    test('should return NEEDS_DETAILS when not authenticated', () => {
      const result = determineEnrollmentState({
        tokenValid: true,
        authStatus: 'UNAUTHENTICATED',
        patient: basePatient
      });

      expect(result.state).toBe('NEEDS_DETAILS');
      expect(result.canProceed).toBe(false);
    });

    test('should return NEEDS_CONTACT_VERIFICATION when no contact info', () => {
      const result = determineEnrollmentState({
        tokenValid: true,
        authStatus: 'AUTHENTICATED',
        patient: basePatient,
        user: {
          phone: null,
          phoneVerifiedAt: null,
          email: null,
          emailVerifiedAt: null
        }
      });

      expect(result.state).toBe('NEEDS_CONTACT_VERIFICATION');
      expect(result.canProceed).toBe(false);
      expect(result.reason).toContain('Contact information');
    });

    test('should return NEEDS_OTP_VERIFICATION when contact is unverified', () => {
      const result = determineEnrollmentState({
        tokenValid: true,
        authStatus: 'AUTHENTICATED',
        patient: basePatient,
        user: {
          ...baseUser,
          phoneVerifiedAt: null
        }
      });

      expect(result.state).toBe('NEEDS_OTP_VERIFICATION');
      expect(result.canProceed).toBe(false);
      expect(result.reason).toContain('OTP');
    });

    test('should return NEEDS_EMPLOYMENT_VERIFICATION when not approved', () => {
      const result = determineEnrollmentState({
        tokenValid: true,
        authStatus: 'AUTHENTICATED',
        patient: basePatient,
        user: baseUser,
        companyPatient: { approvedAt: null }
      });

      expect(result.state).toBe('NEEDS_EMPLOYMENT_VERIFICATION');
      expect(result.canProceed).toBe(false);
      expect(result.reason).toContain('Employment');
    });

    test('should return READY_FOR_EVALUATION when all checks pass', () => {
      const result = determineEnrollmentState({
        tokenValid: true,
        authStatus: 'AUTHENTICATED',
        patient: basePatient,
        user: baseUser,
        companyPatient: baseCompanyPatient
      });

      expect(result.state).toBe('READY_FOR_EVALUATION');
      expect(result.canProceed).toBe(true);
      expect(result.reason).toBeUndefined();
    });

    test('should handle LOADING auth status', () => {
      const result = determineEnrollmentState({
        tokenValid: true,
        authStatus: 'LOADING' as AuthenticationStatus,
        patient: basePatient,
        user: baseUser
      });

      expect(result.state).toBe('NEEDS_DETAILS');
      expect(result.canProceed).toBe(false);
    });

    test('should handle missing companyPatient when checking approval', () => {
      const result = determineEnrollmentState({
        tokenValid: true,
        authStatus: 'AUTHENTICATED',
        patient: basePatient,
        user: baseUser,
        companyPatient: null
      });

      expect(result.state).toBe('NEEDS_EMPLOYMENT_VERIFICATION');
      expect(result.canProceed).toBe(false);
    });
  });
});

