import type { EligibilityReason } from './EligibilityReason';

export interface CheckEnrollmentEligibilityResponse {
  isEligible: boolean;
  reason: EligibilityReason;
}
