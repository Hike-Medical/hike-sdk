export interface CompanyPreferences {
  carrierServiceCode?: string;
  carrierPreferenceId?: string;
  preferredSubmittedOrderEmailAddress?: string;
  preferredVeteranEmailAddress?: string;
  preSubmissionAuth?: boolean;
  scanOrderOnly?: boolean;
  requiredSnapshotReview?: boolean;
  modifyTaikaHeelStyle?: boolean;
  pricing?: {
    orthoFeetPricingMultiplierPercentage?: number;
  };
  noAuthNeeded?: boolean;
}
