export interface CheckoutSessionInfo {
  employeeOriginal: number;
  employeeDiscounted: number;
  employerOriginal: number;
  employerDiscounted: number;
  isReorder: boolean;
  insuranceEligibility?: string;
  appliedCoupon?: {
    code: string;
    name: string;
    discount: number;
    promotionCodeId: string;
  };
}

export interface GetCheckoutSessionInfoParams {
  couponCode?: string;
}

export interface ConsumerSubmitParams {
  couponCode?: string;
}
