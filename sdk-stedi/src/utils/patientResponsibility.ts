import type { Benefit, PatientPaymentEstimate, PatientResponsibilityEstimate } from '../types/eligibility';
import { BenefitCode, InPlanNetworkIndicator } from '../types/eligibility';
import type { ServiceTypeCodeValue } from '../types/serviceTypes';
import { ServiceTypeCode } from '../types/serviceTypes';

/**
 * Default service type code for general medical benefits
 * STC 30 (Health Benefit Plan Coverage) is the standard for general medical
 * @see https://www.stedi.com/blog/how-to-estimate-patient-responsibility-using-a-271-eligibility-response
 */
const DEFAULT_SERVICE_TYPE_CODES: ServiceTypeCodeValue[] = [ServiceTypeCode.HEALTH_BENEFIT_PLAN_COVERAGE];

interface BenefitFilter {
  code: string;
  inNetwork?: boolean;
  serviceTypeCodes?: ServiceTypeCodeValue[];
  coverageLevel?: 'IND' | 'FAM';
  timeQualifier?: string;
}

/**
 * Parse a benefit amount string to cents
 */
const parseBenefitAmountToCents = (amount?: string): number => {
  if (!amount) return 0;
  const parsed = parseFloat(amount);
  if (Number.isNaN(parsed)) return 0;
  return Math.round(parsed * 100);
};

/**
 * Parse a benefit percent string to a number (0-100)
 */
const parseBenefitPercent = (percent?: string): number => {
  if (!percent) return 0;
  const parsed = parseFloat(percent);
  if (Number.isNaN(parsed)) return 0;
  // Stedi returns percent as decimal (e.g., "0.20" for 20%)
  // But some payers return as whole number (e.g., "20")
  return parsed <= 1 ? parsed * 100 : parsed;
};

/**
 * Check if a benefit matches the filter criteria
 */
const matchesBenefitFilter = (benefit: Benefit, filter: BenefitFilter): boolean => {
  // Must match benefit code
  if (benefit.code !== filter.code) return false;

  // Check in-network indicator if specified
  // Use inPlanNetworkIndicatorCode (Y, N, W, U) not inPlanNetworkIndicator (Yes, No, etc.)
  if (filter.inNetwork !== undefined) {
    const indicatorCode = benefit.inPlanNetworkIndicatorCode;
    const inNetworkValue = InPlanNetworkIndicator.IN_NETWORK as string; // 'Y'
    const outOfNetworkValue = InPlanNetworkIndicator.OUT_OF_NETWORK as string; // 'N'
    const bothValue = InPlanNetworkIndicator.BOTH as string; // 'W'

    if (indicatorCode) {
      if (filter.inNetwork) {
        // In-network: Y or W (both)
        if (indicatorCode !== inNetworkValue && indicatorCode !== bothValue) {
          return false;
        }
      } else if (indicatorCode !== outOfNetworkValue && indicatorCode !== bothValue) {
        // Out-of-network: N or W (both)
        return false;
      }
    }
    // If no indicator code, allow the benefit to match (treat as potentially applicable)
  }

  // Check service type codes if specified
  if (filter.serviceTypeCodes?.length) {
    const benefitSTCs = benefit.serviceTypeCodes ?? [];
    // Benefit applies if it has no STCs (general benefit) or matches requested STCs
    if (benefitSTCs.length > 0) {
      const hasMatch = benefitSTCs.some((stc) => filter.serviceTypeCodes?.includes(stc));
      if (!hasMatch) return false;
    }
  }

  // Check coverage level if specified
  // Use coverageLevelCode (IND, FAM) not coverageLevel (Individual, Family)
  if (filter.coverageLevel) {
    const levelCode = benefit.coverageLevelCode;
    if (levelCode && levelCode !== filter.coverageLevel) {
      return false;
    }
  }

  // Check time qualifier if specified (for remaining amounts)
  if (filter.timeQualifier && benefit.timeQualifierCode !== filter.timeQualifier) {
    return false;
  }

  return true;
};

/**
 * Find the first matching benefit with fallback to less strict matching
 * Fallback order:
 * 1. Exact match with requested STCs
 * 2. Benefits with NO STCs (general benefits that apply to all services)
 * 3. Remove coverage level requirement
 */
const findBenefit = (benefits: Benefit[], filter: BenefitFilter): Benefit | undefined => {
  // First try exact match with requested STCs
  let result = benefits.find((benefit) => matchesBenefitFilter(benefit, filter));

  // If no match, try general benefits (benefits with no specific STCs)
  // These apply to all services and are appropriate fallbacks
  if (!result && filter.serviceTypeCodes?.length) {
    result = benefits.find((benefit) => {
      // Only consider benefits with NO serviceTypeCodes (general benefits)
      if (benefit.serviceTypeCodes?.length) return false;
      return matchesBenefitFilter(benefit, { ...filter, serviceTypeCodes: undefined });
    });
  }

  // If still no match and we have coverage level, try without it
  if (!result && filter.coverageLevel) {
    result = benefits.find((benefit) => matchesBenefitFilter(benefit, { ...filter, coverageLevel: undefined }));
  }

  return result;
};

/**
 * Extract patient responsibility estimates from eligibility benefits
 * @see https://www.stedi.com/blog/how-to-estimate-patient-responsibility-using-a-271-eligibility-response
 */
export const extractPatientResponsibility = (
  benefits: Benefit[] | undefined,
  options?: {
    /** Service type codes to filter by (defaults to DME/orthotics codes) */
    serviceTypeCodes?: ServiceTypeCodeValue[];
    /** Whether to prefer in-network benefits (defaults to true) */
    preferInNetwork?: boolean;
  }
): PatientResponsibilityEstimate => {
  const serviceTypeCodes = options?.serviceTypeCodes ?? DEFAULT_SERVICE_TYPE_CODES;
  const preferInNetwork = options?.preferInNetwork ?? true;

  // Default response when no benefits available
  if (!benefits?.length) {
    return {
      copay: 0,
      coinsurancePercent: 0,
      deductible: 0,
      outOfPocketMax: 0,
      isCovered: false,
      hasInNetworkBenefits: false,
      serviceTypeCodes: serviceTypeCodes as string[]
    };
  }

  // Check for non-covered services first
  const nonCoveredBenefit = findBenefit(benefits, {
    code: BenefitCode.NON_COVERED,
    serviceTypeCodes
  });

  if (nonCoveredBenefit) {
    return {
      copay: 0,
      coinsurancePercent: 100, // Patient pays 100% if not covered
      deductible: 0,
      outOfPocketMax: 0,
      isCovered: false,
      hasInNetworkBenefits: false,
      serviceTypeCodes: serviceTypeCodes as string[]
    };
  }

  // Check if any in-network benefits exist
  // Use inPlanNetworkIndicatorCode (Y, N, W, U) for comparison
  const inNetworkBenefits = benefits.filter((b) => {
    const code = b.inPlanNetworkIndicatorCode;
    return (
      code === (InPlanNetworkIndicator.IN_NETWORK as string) ||
      code === (InPlanNetworkIndicator.BOTH as string) ||
      !code // Treat missing indicator as potentially in-network
    );
  });
  const hasInNetworkBenefits = inNetworkBenefits.length > 0;

  // Determine which network to use for benefit lookup (try in-network first if preferred)
  const inNetwork = preferInNetwork;

  // Find co-pay (code B)
  // findBenefit internally falls back to general benefits (no STCs) if no specific match
  const copayBenefit = findBenefit(benefits, {
    code: BenefitCode.COPAY,
    inNetwork,
    serviceTypeCodes
  });
  const copay = parseBenefitAmountToCents(copayBenefit?.benefitAmount);

  // Find co-insurance (code A) - patient's percentage
  // findBenefit internally falls back to general benefits (no STCs) if no specific match
  const coinsuranceBenefit = findBenefit(benefits, {
    code: BenefitCode.COINSURANCE,
    inNetwork,
    serviceTypeCodes
  });
  const coinsurancePercent = parseBenefitPercent(coinsuranceBenefit?.benefitPercent);

  // Find individual deductible (code C)
  // Try with coverage level IND first, then fallback
  let deductibleBenefit = findBenefit(benefits, {
    code: BenefitCode.DEDUCTIBLE,
    inNetwork,
    serviceTypeCodes,
    coverageLevel: 'IND'
  });
  if (!deductibleBenefit) {
    // Try without coverage level filter (some plans don't specify)
    deductibleBenefit = findBenefit(benefits, {
      code: BenefitCode.DEDUCTIBLE,
      inNetwork,
      serviceTypeCodes
    });
  }
  const deductible = parseBenefitAmountToCents(deductibleBenefit?.benefitAmount);

  // Find remaining deductible (code C with time qualifier 29 = remaining)
  let deductibleRemainingBenefit = findBenefit(benefits, {
    code: BenefitCode.DEDUCTIBLE,
    inNetwork,
    serviceTypeCodes,
    coverageLevel: 'IND',
    timeQualifier: '29'
  });
  if (!deductibleRemainingBenefit) {
    // Try without coverage level
    deductibleRemainingBenefit = findBenefit(benefits, {
      code: BenefitCode.DEDUCTIBLE,
      inNetwork,
      serviceTypeCodes,
      timeQualifier: '29'
    });
  }
  const deductibleRemaining = deductibleRemainingBenefit
    ? parseBenefitAmountToCents(deductibleRemainingBenefit.benefitAmount)
    : undefined;

  // Find out-of-pocket maximum (code G)
  // OOP max often applies across all services, so fallback to general benefits is appropriate
  let oopMaxBenefit = findBenefit(benefits, {
    code: BenefitCode.OUT_OF_POCKET_MAX,
    inNetwork,
    serviceTypeCodes,
    coverageLevel: 'IND'
  });
  if (!oopMaxBenefit) {
    // Try without coverage level
    oopMaxBenefit = findBenefit(benefits, {
      code: BenefitCode.OUT_OF_POCKET_MAX,
      inNetwork,
      serviceTypeCodes
    });
  }
  const outOfPocketMax = parseBenefitAmountToCents(oopMaxBenefit?.benefitAmount);

  // Find remaining out-of-pocket (code G with time qualifier 29 = remaining)
  let oopRemainingBenefit = findBenefit(benefits, {
    code: BenefitCode.OUT_OF_POCKET_MAX,
    inNetwork,
    serviceTypeCodes,
    coverageLevel: 'IND',
    timeQualifier: '29'
  });
  if (!oopRemainingBenefit) {
    // Try without coverage level
    oopRemainingBenefit = findBenefit(benefits, {
      code: BenefitCode.OUT_OF_POCKET_MAX,
      inNetwork,
      serviceTypeCodes,
      timeQualifier: '29'
    });
  }
  const outOfPocketRemaining = oopRemainingBenefit
    ? parseBenefitAmountToCents(oopRemainingBenefit.benefitAmount)
    : undefined;

  return {
    copay,
    coinsurancePercent,
    deductible,
    deductibleRemaining,
    outOfPocketMax,
    outOfPocketRemaining,
    isCovered: true,
    hasInNetworkBenefits,
    serviceTypeCodes: serviceTypeCodes as string[]
  };
};

/**
 * Calculate estimated patient payment for a service
 *
 * @param servicePrice - Service price in cents
 * @param responsibility - Patient responsibility estimate from eligibility
 * @returns Estimated patient payment breakdown
 *
 * @see https://www.stedi.com/blog/how-to-estimate-patient-responsibility-using-a-271-eligibility-response
 */
export const calculatePatientPayment = (
  servicePrice: number,
  responsibility: PatientResponsibilityEstimate
): PatientPaymentEstimate => {
  // If not covered, patient pays full price
  if (!responsibility.isCovered) {
    return {
      servicePrice,
      insurancePays: 0,
      patientPays: servicePrice,
      breakdown: {
        deductible: 0,
        copay: 0,
        coinsurance: servicePrice
      },
      isEstimateAvailable: true,
      unavailableReason: 'Service not covered'
    };
  }

  // Use remaining amounts if available
  // If remaining is not provided, assume deductible is already met (0 remaining)
  // This is more patient-friendly than assuming full deductible applies
  // The final amount is determined after claim processing anyway
  const effectiveDeductible = responsibility.deductibleRemaining ?? 0;
  const effectiveOOP = responsibility.outOfPocketRemaining ?? responsibility.outOfPocketMax;

  let remaining = servicePrice;
  let deductiblePortion = 0;
  let copayPortion = 0;
  let coinsurancePortion = 0;

  // 1. Apply deductible first (patient pays up to deductible remaining)
  if (effectiveDeductible > 0 && remaining > 0) {
    deductiblePortion = Math.min(remaining, effectiveDeductible);
    remaining -= deductiblePortion;
  }

  // 2. Apply co-pay if applicable
  if (responsibility.copay > 0 && remaining > 0) {
    copayPortion = Math.min(remaining, responsibility.copay);
    remaining -= copayPortion;
  }

  // 3. Apply co-insurance to remaining amount
  if (responsibility.coinsurancePercent > 0 && remaining > 0) {
    coinsurancePortion = Math.round(remaining * (responsibility.coinsurancePercent / 100));
  }

  // Total patient responsibility
  let patientPays = deductiblePortion + copayPortion + coinsurancePortion;

  // 4. Cap at out-of-pocket maximum remaining
  if (effectiveOOP > 0 && patientPays > effectiveOOP) {
    patientPays = effectiveOOP;
    // Redistribute the cap proportionally
    const ratio = effectiveOOP / (deductiblePortion + copayPortion + coinsurancePortion);
    deductiblePortion = Math.round(deductiblePortion * ratio);
    copayPortion = Math.round(copayPortion * ratio);
    coinsurancePortion = effectiveOOP - deductiblePortion - copayPortion;
  }

  // Insurance pays the rest
  const insurancePays = servicePrice - patientPays;

  return {
    servicePrice,
    insurancePays: Math.max(0, insurancePays),
    patientPays: Math.max(0, patientPays),
    breakdown: {
      deductible: deductiblePortion,
      copay: copayPortion,
      coinsurance: coinsurancePortion
    },
    isEstimateAvailable: true
  };
};

/**
 * Convenience function to calculate patient payment directly from benefits
 *
 * @param servicePrice - Service price in cents
 * @param benefits - Benefits from eligibility response
 * @param options - Optional configuration
 */
export const calculatePatientPaymentFromBenefits = (
  servicePrice: number,
  benefits: Benefit[] | undefined,
  options?: {
    serviceTypeCodes?: ServiceTypeCodeValue[];
    preferInNetwork?: boolean;
  }
): PatientPaymentEstimate => {
  const responsibility = extractPatientResponsibility(benefits, options);
  return calculatePatientPayment(servicePrice, responsibility);
};
