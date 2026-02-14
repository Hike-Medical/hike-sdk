/**
 * Types for 277CA Claim Acknowledgments
 * API Reference: https://www.stedi.com/docs/healthcare/api-reference/get-healthcare-reports-277
 */

export interface ClaimAcknowledgment277CA {
  meta: {
    transactionId: string;
    applicationMode?: string;
    senderId?: string;
    traceId?: string;
  };
  transactions: ClaimAcknowledgmentTransaction[];
}

export interface ClaimAcknowledgmentTransaction {
  controlNumber: string;
  payers: PayerClaimStatus[];
  referenceIdentification?: string;
  transactionSetCreationDate?: string;
  transactionSetCreationTime?: string;
}

export interface PayerClaimStatus {
  organizationName?: string;
  centersForMedicareAndMedicaidServicePlanId?: string;
  claimStatusTransactions: ClaimStatusTransaction[];
}

export interface ClaimStatusTransaction {
  claimTransactionBatchNumber?: string;
  provider?: {
    etin?: string;
    organizationName?: string;
  };
  providerClaimStatuses?: ProviderClaimStatus[];
  claimStatusDetails: ClaimStatusDetail[];
}

export interface ProviderClaimStatus {
  providerStatuses: AcknowledgmentStatusInfo[];
  statusInformationEffectiveDate?: string;
}

export interface ClaimStatusDetail {
  providerOFServiceInformationTraceIdentifier?: string;
  serviceProvider?: {
    npi?: string;
    organizationName?: string;
  };
  patientClaimStatusDetails: PatientClaimStatusDetail[];
}

export interface PatientClaimStatusDetail {
  subscriber: {
    memberId: string;
    firstName?: string;
    lastName?: string;
  };
  claims: ClaimStatusInfo[];
}

export interface ClaimStatusInfo {
  claimStatus: {
    referencedTransactionTraceNumber: string; // Use this to correlate with original claim
    patientAccountNumber?: string;
    clearinghouseTraceNumber?: string;
    claimServiceDate?: string;
    claimServiceBeginDate?: string;
    claimServiceEndDate?: string;
    billTypeIdentifier?: string;
    informationClaimStatuses: InformationClaimStatus[];
  };
}

export interface InformationClaimStatus {
  totalClaimChargeAmount?: string;
  statusInformationEffectiveDate?: string;
  informationStatuses: AcknowledgmentStatusInfo[];
}

export interface AcknowledgmentStatusInfo {
  healthCareClaimStatusCategoryCode: string;
  healthCareClaimStatusCategoryCodeValue?: string;
  statusCode: string;
  statusCodeValue?: string;
}

export interface ClaimStatusSummary {
  accepted: boolean;
  statusCode: string;
  statusMessage: string;
  traceNumber?: string;
}

export interface ClaimAcknowledgmentResult {
  success: boolean;
  data?: ClaimAcknowledgment277CA;
  error?: string;
  errorDetails?: unknown;
}

/**
 * Common 277CA Status Category Codes
 */
export const ClaimStatusCategoryCodes = {
  ACKNOWLEDGMENT: 'A1', // Acknowledged/Receipt
  ACCEPTED: 'A2', // Accepted
  REJECTED: 'A3', // Rejected
  PENDED: 'A4', // Pended
  FINALIZED: 'F0', // Finalized - Denial
  FINALIZED_PAYMENT: 'F1', // Finalized - Payment
  FINALIZED_FORWARD: 'F2', // Finalized - Forwarded to another payer
  FINALIZED_PARTIAL: 'F3' // Finalized - Partial payment
} as const;

/**
 * Common 277CA Status Codes
 */
export const ClaimStatusCodes = {
  ACCEPTED: '20', // Accepted for processing
  REJECTED: '26', // Rejected
  ACKNOWLEDGED: '19', // Acknowledged
  PENDED: '21', // Pended for review
  DENIED: '27', // Denied
  PAID: '1', // Processed as primary
  FORWARDED: '2', // Processed as secondary
  PROCESSED: '3' // Processed as tertiary
} as const;
