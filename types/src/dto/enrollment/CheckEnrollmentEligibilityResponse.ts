import type { EligibilityReason } from './EligibilityReason';

export interface CheckEnrollmentEligibilityResponse {
  isEligible: boolean;
  stedi?: {
    controlNumber?: string;
    hasActiveCoverage?: boolean;
    summary?: string;
  };
  reason: EligibilityReason;
}
