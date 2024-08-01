export interface CompanyPreferences {
  carrierServiceCode?: string;
  carrierPreferenceId?: string;
  distributionEmailAddress?: string;
  preferredSubmittedOrderEmailAddress?: string;
  preferredVeteranEmailAddress?: string;
  simplrHospitalDeliveryReceiptEmailAddress?: string;
  simplrWalkInDeliveryReceiptEmailAddress?: string;
  preSubmissionAuth?: boolean;
  requiredSnapshotReview?: boolean;
  modifyTaikaHeelStyle?: boolean;
  pricing?: {
    orthoFeetPricingMultiplierPercentage?: number;
  };
  noAuthNeeded?: boolean;
}
