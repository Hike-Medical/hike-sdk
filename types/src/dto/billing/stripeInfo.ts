import { StripeProductType } from '../../../prisma/index';

export interface StripeProductPrices {
  stripeProductType: StripeProductType;
  priceId: string;
  couponId?: string;
}

export interface StripeLineItem {
  quantity: number;
  priceId?: string;
  amount?: number;
  couponId?: string;
  description?: string;
}

export interface StripeFlaggedCoupon {
  flag?: string;
  couponId: string;
}
