import type { EligibilityReason } from './EligibilityReason';

export interface EligibilityDetails {
  readonly isEligible: boolean;
  readonly reason: EligibilityReason;
  readonly requiresApproval?: boolean;
}
