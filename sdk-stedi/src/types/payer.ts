/**
 * Payer-related types for Stedi Healthcare API
 * API Reference: https://www.stedi.com/docs/healthcare/api-reference/get-search-payers
 */

export type PayerCoverageType = 'medical' | 'dental' | 'vision';

export type PayerServiceSupport = 'SUPPORTED' | 'NOT_SUPPORTED' | 'ENROLLMENT_REQUIRED' | 'EITHER';

export interface PayerAddress {
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
}

export interface PayerContactInfo {
  name?: string;
  phoneNumber?: string;
  email?: string;
  url?: string;
}

export interface PayerEnrollment {
  enrollmentRequired?: boolean;
  enrollmentUrl?: string;
  contactInfo?: PayerContactInfo;
}

export interface PayerService {
  eligibilityCheck?: PayerServiceSupport;
  claimStatus?: PayerServiceSupport;
  professionalClaimSubmission?: PayerServiceSupport;
  enrollment?: PayerEnrollment;
}

export interface Payer {
  id: string;
  stediId: string;
  displayName: string;
  primaryPayerId: string;
  avatarUrl?: string;
  aliases?: string[];
  address?: PayerAddress;
  coverageTypes?: PayerCoverageType[];
  services?: PayerService;
}

export interface PayerSearchItem {
  payer: Payer;
}

export interface PayerSearchOptions {
  eligibilityCheck?: PayerServiceSupport;
  claimStatus?: PayerServiceSupport;
  professionalClaimSubmission?: PayerServiceSupport;
  coverageTypes?: PayerCoverageType[];
}

export interface PayerSearchResult {
  payer: Payer;
}

