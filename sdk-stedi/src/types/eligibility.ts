import { StediError } from './error';
import type { Dependent, Subscriber } from './patient';
import type { Provider } from './provider';

export interface Encounter {
  beginningDateOfService?: string; // Format: YYYYMMDD
  endDateOfService?: string; // Format: YYYYMMDD
  dateOfService?: string; // Format: YYYYMMDD
  serviceTypeCodes?: string[];
  priorAuthorizationOrReferralNumber?: string;
  referenceIdentificationQualifier?: string;
  industryCode?: string;
  productOrServiceIDQualifier?: string;
  procedureCode?: string;
  procedureModifiers?: string[];
  diagnosisCodePointer?: string;
  medicalProcedures?: MedicalProcedure[];
}

export interface MedicalProcedure {
  procedureCode?: string;
  procedureModifiers?: string[];
}

export interface EligibilityRequest {
  controlNumber: string;
  tradingPartnerServiceId: string;
  subscriber: Subscriber;
  provider: Provider;
  dependents?: Dependent[];
  encounter?: Encounter;
  externalPatientId?: string;
}

export interface Benefit {
  serviceTypeCodes?: string[];
  coverageLevel?: string;
  insuranceType?: string;
  planCoverage?: string;
  benefitAmount?: string;
  benefitPercent?: string;
  benefitDescription?: string;
  timePeriodQualifier?: string;
  benefitQuantity?: string;
  authorizationOrCertificationIndicator?: string;
  inPlanNetworkIndicator?: string;
  coverageStatus?: string;
  planDateQualifier?: string;
  planDate?: string;
  code?: string;
  name?: string;
}

export interface EligibilityResponse {
  controlNumber: string;
  tradingPartnerServiceId: string;
  benefits?: Benefit[];
  subscriber?: {
    memberId: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    planNumber?: string;
    groupNumber?: string;
  };
  errors?: StediError[];
  status?: string;
  eligibilitySearchId?: string;
  payer?: {
    name?: string;
    payorIdentification?: string;
  };
  planInformation?: {
    groupNumber?: string;
    groupDescription?: string;
  };
  planDateInformation?: {
    planBegin?: string;
    planEnd?: string;
    eligibility?: string;
    eligibilityBegin?: string;
  };
  benefitsInformation?: any[];
  planStatus?: any[];
}

export interface EligibilityCheckOptions {
  serviceTypeCodes?: string[];
  encounterDate?: string; // Format: YYYY-MM-DD
  icd10Codes?: string[];
  tradingPartner?: string; // e.g., 'CMS', 'CIGNA', 'AETNA'
}

export interface EligibilityInterpretation {
  isEligible: boolean;
  hasActiveCoverage: boolean;
  summary: string;
  details: {
    subscriber?: {
      memberId: string;
      firstName: string;
      lastName: string;
      dateOfBirth: string;
      planNumber?: string;
      groupNumber?: string;
    };
    benefits?: Benefit[];
    insuranceTypes?: string;
    planNumber?: string;
    groupNumber?: string;
    errors?: StediError[];
  };
}
