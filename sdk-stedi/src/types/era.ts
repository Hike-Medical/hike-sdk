/**
 * Electronic Remittance Advice (ERA) Types
 * ERA is the electronic payment response from payers (835 transactions)
 * API Reference: https://www.stedi.com/docs/healthcare/electronic-remittance-advice
 */

export interface ERARequest {
  tradingPartnerServiceId?: string;
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  claimId?: string;
  checkNumber?: string;
}

export interface ERAListResponse {
  items: ERA[];
  pagination?: {
    nextToken?: string;
    totalCount?: number;
  };
}

export interface ERA {
  id: string;
  tradingPartnerServiceId: string;
  payerName?: string;
  payerIdentification?: string;
  payeeName?: string;
  payeeIdentification?: string;
  checkOrEftNumber?: string;
  checkOrEftDate?: string; // YYYY-MM-DD
  totalActualProviderPaymentAmount?: string;
  creditOrDebitFlag?: 'C' | 'D';
  paymentMethod?: string;
  claimPayments?: ClaimPayment[];
  createdAt?: string;
  raw?: unknown; // Full 835 transaction data
}

export interface ClaimPayment {
  claimId?: string;
  patientControlNumber?: string;
  claimStatusCode?: string;
  totalClaimChargeAmount?: string;
  claimPaymentAmount?: string;
  patientResponsibilityAmount?: string;
  claimFilingIndicatorCode?: string;
  payerClaimControlNumber?: string;
  facilityTypeCode?: string;
  claimFrequencyCode?: string;
  patient?: {
    memberId?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
  };
  serviceLines?: ServiceLinePayment[];
  adjustments?: ClaimAdjustment[];
  dates?: {
    statementPeriodStart?: string;
    statementPeriodEnd?: string;
    receivedDate?: string;
  };
}

export interface ServiceLinePayment {
  serviceDate?: string;
  procedureCode?: string;
  procedureModifiers?: string[];
  chargeAmount?: string;
  paymentAmount?: string;
  unitCount?: string;
  adjustments?: ServiceLineAdjustment[];
  remarkCodes?: string[];
}

export interface ClaimAdjustment {
  adjustmentGroupCode?: string;
  adjustmentReasonCode?: string;
  adjustmentAmount?: string;
  adjustmentQuantity?: string;
  remarkCode?: string;
}

export interface ServiceLineAdjustment {
  adjustmentGroupCode?: string;
  adjustmentReasonCode?: string;
  adjustmentAmount?: string;
  adjustmentQuantity?: string;
}

export interface ERAPDFResponse {
  url: string;
  expiresAt?: string;
}

export interface ERAResult {
  success: boolean;
  data?: ERA;
  error?: string;
  errorDetails?: unknown;
}

export interface ERAListResult {
  success: boolean;
  data?: ERAListResponse;
  error?: string;
  errorDetails?: unknown;
}

export interface ERAForClaimResult {
  success: boolean;
  data?: ERA[];
  error?: string;
  errorDetails?: unknown;
}

export interface ERAPDFResult {
  success: boolean;
  data?: ERAPDFResponse;
  error?: string;
  errorDetails?: unknown;
}

/** Claim status codes used in ERA/835 responses */
export const ERA_CLAIM_STATUS_CODES = {
  '1': 'Processed as Primary',
  '2': 'Processed as Secondary',
  '3': 'Processed as Tertiary',
  '4': 'Denied',
  '19': 'Processed as Primary, Forwarded to Additional Payer(s)',
  '20': 'Processed as Secondary, Forwarded to Additional Payer(s)',
  '21': 'Processed as Tertiary, Forwarded to Additional Payer(s)',
  '22': 'Reversal of Previous Payment',
  '23': 'Not Our Claim, Forwarded to Additional Payer(s)'
} as const;

/** Adjustment group codes used in ERA/835 responses */
export const ERA_ADJUSTMENT_GROUP_CODES = {
  CO: 'Contractual Obligations',
  CR: 'Correction and Reversals',
  OA: 'Other Adjustments',
  PI: 'Payer Initiated Reductions',
  PR: 'Patient Responsibility'
} as const;
