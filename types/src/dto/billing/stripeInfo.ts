export interface StripeLineItem {
  quantity: number;
  priceId?: string;
  productId: string;
  amount?: number;
  couponIds?: string[];
  description?: string;
}

export interface StripeFlaggedCoupon {
  flag?: string;
  couponId: string;
}

export interface BillingPreferences {
  flaggedCoupons?: StripeFlaggedCoupon[];
  allowPayrollDeduction?: boolean;
}
