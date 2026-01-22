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
  };
}

export interface GetCheckoutSessionInfoParams {
  couponCode?: string;
}
