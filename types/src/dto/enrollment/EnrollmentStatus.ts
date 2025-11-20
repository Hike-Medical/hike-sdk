import type { ConsolidationDetails } from './ConsolidationDetails';
import type { EligibilityDetails } from './EligibilityDetails';
import type { EnrollmentStatusType } from './EnrollmentStatusType';

export interface EnrollmentStatus {
  readonly status: EnrollmentStatusType;
  readonly isContactVerified: boolean;
  readonly isEligible: boolean;
  readonly hasPatientInfo: boolean;
  readonly needsConsolidation: boolean;
  readonly canProceed: boolean;
  readonly consolidation?: ConsolidationDetails;
  readonly eligibility?: EligibilityDetails;
}
