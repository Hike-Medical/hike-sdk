export interface CompanyPreferences {
  carrierServiceCode?: string;
  carrierPreferenceId?: string;
  preferredSubmittedOrderEmailAddress?: string;
  preferredVeteranEmailAddress?: string;
  preSubmissionAuth?: boolean;
  scanOrderOnly?: boolean;
  pricing?: {
    orthoFeetPricingMultiplierPercentage?: number;
  };
}
