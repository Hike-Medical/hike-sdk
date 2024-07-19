import { StripeFlaggedCoupon, StripeProductPrices } from '../billing/stripeInfo';

export interface CompanyPreferences {
  carrierServiceCode?: string;
  carrierPreferenceId?: string;
  preferredSubmittedOrderEmailAddress?: string;
  preferredVeteranEmailAddress?: string;
  preSubmissionAuth?: boolean;
  scanOrderOnly?: boolean;
  modifyTaikaHeelStyle?: boolean;
  pricing?: {
    orthoFeetPricingMultiplierPercentage?: number;
    stripe?: {
      customerId: string;
      clinicSubscriptionId?: string;
      flaggedCoupons?: StripeFlaggedCoupon[];
      productPrices: StripeProductPrices[];
    };
  };
}
