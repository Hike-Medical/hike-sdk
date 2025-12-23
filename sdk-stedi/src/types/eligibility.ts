import type { StediError } from '../errors/types';
import type { Dependent, Subscriber } from './patient';
import type { Provider } from './provider';
import type { ServiceTypeCodeValue } from './serviceTypes';

/**
 * Benefit codes from 271 eligibility responses
 * @see https://www.stedi.com/blog/how-to-estimate-patient-responsibility-using-a-271-eligibility-response
 */
export enum BenefitCode {
  /** Co-insurance: Percentage the patient pays for the benefit */
  COINSURANCE = 'A',
  /** Co-pay: Fixed dollar amount the patient pays for the benefit */
  COPAY = 'B',
  /** Deductible: Total amount the patient must pay before benefits begin */
  DEDUCTIBLE = 'C',
  /** Coverage Basis: Describes level of coverage */
  COVERAGE_BASIS = 'D',
  /** Coverage Description: Additional information about covered services */
  COVERAGE_DESCRIPTION = 'E',
  /** Limitations (Maximums): Maximum benefit amount */
  LIMITATIONS = 'F',
  /** Out of Pocket (Stop Loss): Maximum amount patient pays per year */
  OUT_OF_POCKET_MAX = 'G',
  /** Unlimited: No limitation on benefit amount */
  UNLIMITED = 'H',
  /** Non-covered: Service not covered */
  NON_COVERED = 'I',
  /** Cost Containment: Similar to deductible, typically for Medicaid */
  COST_CONTAINMENT = 'J',
  /** Reserve: Amount held in reserve */
  RESERVE = 'K',
  /** Primary Care Provider: Information about PCP */
  PRIMARY_CARE_PROVIDER = 'L',
  /** Pre-existing Condition: Information about pre-existing conditions */
  PREEXISTING_CONDITION = 'M',
  /** Services Restricted to Following Provider: Provider restriction info */
  PROVIDER_RESTRICTION = 'N',
  /** Not Deemed a Medical Necessity: Service not medically necessary */
  NOT_MEDICALLY_NECESSARY = 'P',
  /** Benefit Disclaimer: Additional benefit information */
  BENEFIT_DISCLAIMER = 'Q',
  /** Second Surgical Opinion Required: Prior authorization required */
  SECOND_OPINION_REQUIRED = 'R',
  /** Service Waiting Period: Waiting period before benefit is active */
  WAITING_PERIOD = 'S',
  /** Existing Condition Waiting Period: Pre-existing condition wait */
  EXISTING_CONDITION_WAIT = 'T',
  /** Primary Care Provider Required: PCP referral required */
  PCP_REQUIRED = 'U',
  /** Plan Network Identification Number */
  PLAN_NETWORK_ID = 'V',
  /** Primary Care Provider Information */
  PCP_INFO = 'W',
  /** Health Care Facility: Facility information */
  FACILITY_INFO = 'X',
  /** Spend Down: Amount patient must pay for Medicaid benefits */
  SPEND_DOWN = 'Y'
}

/**
 * Time Qualifier Codes for benefit amounts
 */
export enum TimeQualifierCode {
  HOUR = '6',
  DAY = '7',
  WEEK = '21',
  VISIT = '22',
  CALENDAR_YEAR = '23',
  YEAR = '24',
  EPISODE = '25',
  SERVICE_YEAR = '26',
  ADMISSION = '27',
  LIFETIME = '29',
  REMAINING = '29', // Remaining Amount
  MONTHS = '30',
  EXCEEDED = '31',
  NOT_EXCEEDED = '32',
  YEARS = '33',
  CONTRACT = '34',
  BENEFIT_PERIOD = '35'
}

/**
 * Coverage Level Codes
 */
export enum CoverageLevelCode {
  CHILDREN_ONLY = 'CHD',
  DEPENDENT = 'DEP',
  EMPLOYEE_AND_CHILDREN = 'ECH',
  EMPLOYEE_ONLY = 'EMP',
  EMPLOYEE_AND_SPOUSE = 'ESP',
  FAMILY = 'FAM',
  INDIVIDUAL = 'IND',
  SPOUSE_AND_CHILDREN = 'SPC',
  SPOUSE_ONLY = 'SPO',
  TWO_PARTY = 'TWO'
}

/**
 * In-Plan Network Indicator
 */
export enum InPlanNetworkIndicator {
  IN_NETWORK = 'Y',
  OUT_OF_NETWORK = 'N',
  BOTH = 'W',
  UNKNOWN = 'U'
}

export interface Encounter {
  beginningDateOfService?: string; // Format: YYYYMMDD
  endDateOfService?: string; // Format: YYYYMMDD
  dateOfService?: string; // Format: YYYYMMDD
  serviceTypeCodes?: ServiceTypeCodeValue[];
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
  /** Service Type Codes this benefit applies to */
  serviceTypeCodes?: ServiceTypeCodeValue[];
  /** Coverage level code (IND, FAM, etc.) */
  coverageLevelCode?: string;
  /** Coverage level description (Individual, Family, etc.) */
  coverageLevel?: string;
  /** Type of insurance */
  insuranceType?: string;
  /** Plan coverage description */
  planCoverage?: string;
  /** Dollar amount for co-pay, deductible, out-of-pocket max */
  benefitAmount?: string;
  /** Percentage for co-insurance (decimal like "0.1" for 10% or "0" for 0%) */
  benefitPercent?: string;
  /** Description of the benefit */
  benefitDescription?: string;
  /** Time qualifier code (calendar year, lifetime, etc.) */
  timePeriodQualifier?: string;
  /** Quantity of benefit available */
  benefitQuantity?: string;
  /** Authorization requirements */
  authorizationOrCertificationIndicator?: string;
  /** In-network indicator CODE (Y, N, W, U) - USE THIS FOR COMPARISONS */
  inPlanNetworkIndicatorCode?: string;
  /** In-network indicator description (Yes, No, Not Applicable, Unknown) */
  inPlanNetworkIndicator?: string;
  /** Coverage status */
  coverageStatus?: string;
  /** Plan date qualifier */
  planDateQualifier?: string;
  /** Plan date */
  planDate?: string;
  /** Benefit code (A=co-insurance, B=co-pay, C=deductible, etc.) */
  code?: string;
  /** Benefit name/description */
  name?: string;
  /** Time qualifier code for what the benefit amount represents */
  timeQualifierCode?: string;
  /** Additional information/notes from payer */
  additionalInformation?: Array<{
    description?: string;
  }>;
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
  benefitsInformation?: BenefitInformation[];
  planStatus?: PlanStatus[];
}

export interface BenefitInformation {
  serviceTypeCodes?: ServiceTypeCodeValue[];
  coverageLevel?: string;
  insuranceType?: string;
  planCoverage?: string;
  benefitAmount?: string;
  benefitPercent?: string;
  benefitDescription?: string;
}

export interface PlanStatus {
  statusCode?: string;
  status?: string;
  planDetails?: string;
  effectiveDate?: string;
  terminationDate?: string;
}

export interface EligibilityCheckOptions {
  serviceTypeCodes?: ServiceTypeCodeValue[];
  encounterDate?: string; // Format: YYYY-MM-DD
  icd10Codes?: string[];
  tradingPartner?: string; // e.g., 'CMS', 'CIGNA', 'AETNA'
}

/**
 * Patient responsibility estimate calculated from eligibility benefits
 * All amounts are in cents
 */
export interface PatientResponsibilityEstimate {
  /** Co-pay amount in cents (fixed amount per service) */
  copay: number;
  /** Co-insurance percentage (0-100) */
  coinsurancePercent: number;
  /** Individual deductible amount in cents */
  deductible: number;
  /** Remaining deductible amount in cents (if available) */
  deductibleRemaining?: number;
  /** Individual out-of-pocket maximum in cents */
  outOfPocketMax: number;
  /** Remaining out-of-pocket in cents (if available) */
  outOfPocketRemaining?: number;
  /** Whether the service is covered */
  isCovered: boolean;
  /** Whether in-network benefits were found */
  hasInNetworkBenefits: boolean;
  /** Service type codes these estimates apply to */
  serviceTypeCodes: string[];
}

/**
 * Estimated patient payment breakdown for a given service price
 * All amounts are in cents
 */
export interface PatientPaymentEstimate {
  /** Original service price in cents */
  servicePrice: number;
  /** Estimated amount insurance will pay in cents */
  insurancePays: number;
  /** Estimated amount patient will pay in cents */
  patientPays: number;
  /** Breakdown of patient responsibility */
  breakdown: {
    /** Deductible portion in cents */
    deductible: number;
    /** Co-pay portion in cents */
    copay: number;
    /** Co-insurance portion in cents */
    coinsurance: number;
  };
  /** Whether estimate could be calculated */
  isEstimateAvailable: boolean;
  /** Reason if estimate is not available */
  unavailableReason?: string;
}

export interface EligibilityCheckResponse {
  isEligible: boolean;
  hasActiveCoverage: boolean;
  summary: string;
  controlNumber: string;
  eligibilitySearchId?: string;
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
  /** Patient responsibility estimate extracted from benefits */
  patientResponsibility?: PatientResponsibilityEstimate;
}

/**
 * Result from eligibility check
 */
export interface EligibilityCheckResult {
  response: EligibilityCheckResponse;
}
