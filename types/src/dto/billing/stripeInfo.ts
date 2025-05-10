import { StripeSubscriptionType } from '../../../prisma';

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
  tierUpgradeCount?: number;
}

export interface StripeProductPreferences {
  addCreditToCustomer?: boolean;
}

export interface BillingSubscriptionStats {
  totalPrice: number;
  periodStart: number;
  periodEnd: number;
  totalOrders: number;
  currentCycle?: boolean;
  stripeSubscriptionId: string;
  stripeInvoiceId?: string;
  type: StripeSubscriptionType;
}

export interface BillingOverview {
  totalPaid: number;
}

export interface UpFrontPaymentInfo {
  currentRedemptions: number;
  maxRedemptions: number;
  productCost: number;
}

export interface StripeInvoiceTable {
  name: string;
  invoiceCreatedAt: Date;
  price: number;
}
