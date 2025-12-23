/**
 * Insurance payment estimate breakdown
 * All amounts are in cents
 */
export interface InsurancePaymentEstimate {
  /** Amount insurance is estimated to pay in cents */
  insurancePays: number;
  /** Amount patient is estimated to pay in cents */
  patientPays: number;
  /** Breakdown of patient responsibility */
  breakdown?: {
    /** Deductible portion in cents */
    deductible: number;
    /** Co-pay portion in cents */
    copay: number;
    /** Co-insurance portion in cents */
    coinsurance: number;
  };
  /** Whether the estimate was calculated successfully */
  isEstimateAvailable: boolean;
}

export interface CheckoutSessionInfo {
  employeeOriginal: number;
  employeeDiscounted: number;
  employerOriginal: number;
  employerDiscounted: number;
  isReorder: boolean;
  insuranceEligibility?: string;
  insuranceEstimate?: InsurancePaymentEstimate;
}
