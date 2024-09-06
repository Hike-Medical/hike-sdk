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

export interface BillingSubscriptionStats {
  totalPrice: number;
  periodStart: number;
  periodEnd: number;
  totalOrders: number;
  currentCycle?: boolean;
  stripeSubscriptionId: string;
  stripeInvoiceId?: string;
}

export interface StripeInvoiceTable {
  name: string;
  invoiceCreatedAt: Date;
  price: number;
}
