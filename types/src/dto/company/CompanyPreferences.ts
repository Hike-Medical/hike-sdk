import { StripeFlaggedCoupon, StripeProductPrices } from '../billing/stripeInfo';

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
    stripe?: {
      customerId: string;
      clinicSubscriptionId?: string;
      shouldAutoAdvance?: boolean;
      shouldAutoAdvanceCombined?: boolean;
      flaggedCoupons?: StripeFlaggedCoupon[];
      productPrices: StripeProductPrices[];
    };
  };
  noAuthNeeded?: boolean;
}
