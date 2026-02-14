/**
 * Claims submission types
 * API Reference: https://www.stedi.com/docs/healthcare/submit-professional-claims
 */

import type { Address } from './address';
import type { Subscriber } from './patient';
import type { Provider } from './provider';

/**
 * Provider with billing-specific fields (employerId, address) required by Stedi claims API.
 * Extends the base Provider which only has npi, organizationName, firstName, lastName, taxonomyCode.
 */
export interface ClaimProvider extends Provider {
  employerId?: string;
  address?: Address;
}

export interface ClaimRequest {
  controlNumber: string;
  tradingPartnerServiceId: string;
  usageIndicator?: string;
  submitter?: {
    organizationName?: string;
    contactInformation?: {
      name?: string;
      phoneNumber?: string;
      email?: string;
    };
  };
  receiver?: {
    organizationName?: string;
  };
  subscriber: Subscriber;
  billing: ClaimProvider;
  claimInformation: ClaimInformation;
  // Optional provider references
  rendering?: ClaimProvider;
  referring?: ClaimProvider;
  ordering?: ClaimProvider;
  supervising?: ClaimProvider;
}

export interface ClaimInformation {
  claimFilingCode: string;
  patientControlNumber: string;
  claimChargeAmount: string;
  placeOfServiceCode: string;
  claimFrequencyCode: string;
  signatureIndicator: string;
  planParticipationCode?: string;
  benefitsAssignmentCertificationIndicator: string;
  releaseInformationCode: string;
  healthCareCodeInformation: DiagnosisCode[]; // Required diagnosis codes
  serviceLines: ServiceLine[]; // Service lines inside claimInformation
}

export interface DiagnosisCode {
  diagnosisTypeCode: string; // 'ABK' for ICD-10
  diagnosisCode: string; // ICD-10 code (e.g., 'E119', 'M79671')
}

export interface ServiceLine {
  serviceDate: string;
  professionalService: ProfessionalService;
}

export interface ProfessionalService {
  procedureIdentifier: 'HC' | 'ER' | 'IV' | 'WK'; // Procedure code qualifier
  procedureCode: string;
  procedureModifiers?: string[];
  lineItemChargeAmount: string;
  measurementUnit?: string;
  serviceUnitCount: string;
  compositeDiagnosisCodePointers?: {
    diagnosisCodePointers: string[];
  };
}

/**
 * Procedure Identifier Codes:
 * - HC: Healthcare Common Procedure Coding System (HCPCS/CPT) - Most common
 * - ER: Emergency Services
 * - IV: IV Therapy
 * - WK: Work
 */

export interface ClaimResponse {
  controlNumber: string;
  tradingPartnerServiceId: string;
  claimId?: string;
  status: string;
  errors?: Array<{
    code?: string;
    message?: string;
  }>;
}

export interface ClaimSubmissionResult {
  success: boolean;
  data?: ClaimResponse;
  error?: string;
  errorDetails?: unknown;
}

export interface ClaimStatusRequest {
  tradingPartnerServiceId: string;
  informationReceiver: {
    organizationName: string;
    npi: string;
  };
  subscriber: {
    memberId: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string; // YYYYMMDD format
    gender?: 'M' | 'F' | 'U';
  };
  encounter?: {
    serviceDate?: string; // YYYYMMDD format
    claimId?: string;
    submittedAmount?: string;
  };
  providers?: Array<{
    providerType: string;
    organizationName?: string;
    firstName?: string;
    lastName?: string;
    npi: string;
  }>;
}

export interface ClaimStatusResponse {
  tradingPartnerServiceId: string;
  status: string;
  statusDetails?: {
    claimStatusCode?: string;
    claimStatusDescription?: string;
    totalClaimChargeAmount?: string;
    claimPaymentAmount?: string;
    serviceDate?: string;
    checkNumber?: string;
    checkDate?: string;
  };
  errors?: Array<{
    code?: string;
    message?: string;
  }>;
}

export interface ClaimStatusResult {
  success: boolean;
  data?: ClaimStatusResponse;
  error?: string;
  errorDetails?: unknown;
}
