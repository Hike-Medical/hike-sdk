/**
 * Simple 3-step enrollment model
 *
 * COLLECTING - Need to collect patient info (name, DOB)
 * VERIFYING  - Contact not yet verified (redirect to OTP)
 * COMPLETE   - Enrollment done, redirect to workbench
 */
export type EnrollmentStep = 'COLLECTING' | 'VERIFYING' | 'COMPLETE';
