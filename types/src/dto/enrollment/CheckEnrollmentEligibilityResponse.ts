export interface CheckEnrollmentEligibilityResponse {
  isEligible: boolean;
  reason: string;
  stediDetails?: {
    controlNumber?: string;
    hasActiveCoverage?: boolean;
    summary?: string;
  };
}
