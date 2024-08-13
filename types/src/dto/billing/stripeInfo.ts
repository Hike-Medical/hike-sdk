export interface StripeLineItem {
  quantity: number;
  priceId?: string;
  productId: string;
  amount?: number;
  couponId?: string;
  description?: string;
}

export interface StripeFlaggedCoupon {
  flag?: string;
  couponId: string;
}
