import { Logger } from '@hike/sdk';
import { AxiosInstance } from 'axios';
import { randomUUID } from 'crypto';
import { fromStediError } from '../errors/formatter';
import type { StediError } from '../errors/types';
import type { Benefit, EligibilityCheckOptions, EligibilityCheckResult, PlanStatus } from '../types/eligibility';
import type { PatientInput } from '../types/patient';
import type { Provider } from '../types/provider';
import type { ServiceTypeCodeValue } from '../types/serviceTypes';
import { formatDateForStedi } from '../utils/date';

const ELIGIBILITY_ENDPOINT = '/2024-04-01/change/medicalnetwork/eligibility/v3';

interface RawEligibilityRequest {
  controlNumber: string;
  tradingPartnerServiceId: string;
  subscriber: {
    memberId?: string;
    firstName?: string;
    lastName: string;
    dateOfBirth?: string;
    gender?: 'M' | 'F' | 'U';
    address?: {
      address1?: string;
      address2?: string;
      city?: string;
      state?: string;
      postalCode?: string;
    };
    ssn?: string;
  };
  provider: {
    npi: string;
    organizationName?: string;
  };
  encounter?: {
    beginningDateOfService?: string;
    endDateOfService?: string;
    dateOfService?: string;
    serviceTypeCodes?: ServiceTypeCodeValue[];
    priorAuthorizationOrReferralNumber?: string;
    referenceIdentificationQualifier?: string;
    industryCode?: string;
    productOrServiceIDQualifier?: string;
    procedureCode?: string;
    procedureModifiers?: string[];
    diagnosisCodePointer?: string;
  };
  externalPatientId?: string;
}

interface RawEligibilityResponse {
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
  benefitsInformation?: Benefit[];
  planStatus?: PlanStatus[];
}

export class EligibilityClient {
  constructor(
    private readonly axiosInstance: AxiosInstance,
    private readonly logger?: Logger
  ) {}

  /**
   * Check eligibility for a patient
   * @throws {HikeError} with formatted Stedi error details
   */
  async check(
    patient: PatientInput,
    provider: Provider,
    options?: EligibilityCheckOptions
  ): Promise<EligibilityCheckResult> {
    try {
      const request = this.buildRequest(patient, provider, options);
      const { controlNumber } = request;

      this.logger?.log('Stedi eligibility check initiated', { controlNumber });

      const response = await this.axiosInstance.post<RawEligibilityResponse>(ELIGIBILITY_ENDPOINT, request, {
        headers: { 'X-Stedi-Control-Number': controlNumber }
      });

      const result = this.convertResponse(response.data);

      this.logger?.debug('Stedi eligibility check response', {
        controlNumber,
        result,
        raw: response.data
      });

      this.logger?.log('Stedi eligibility check success', {
        controlNumber,
        isEligible: result.response.isEligible,
        hasActiveCoverage: result.response.hasActiveCoverage
      });

      return result;
    } catch (error: unknown) {
      const hikeError = fromStediError(error);

      this.logger?.error('Stedi eligibility check failed', {
        message: hikeError.message,
        errorCode: hikeError.errorCode,
        statusCode: hikeError.statusCode,
        formattedErrors: hikeError.data
      });

      throw hikeError;
    }
  }

  /**
   * Build eligibility request payload
   */
  private buildRequest(
    patient: PatientInput,
    provider: Provider,
    options?: EligibilityCheckOptions
  ): RawEligibilityRequest {
    const request: RawEligibilityRequest = {
      controlNumber: randomUUID(),
      tradingPartnerServiceId: options?.tradingPartner || 'CMS',
      subscriber: {
        ...(patient.memberId && { memberId: patient.memberId }),
        ...(patient.firstName && { firstName: patient.firstName }),
        lastName: patient.lastName,
        ...(patient.dateOfBirth && { dateOfBirth: formatDateForStedi(patient.dateOfBirth) }),
        ...(patient.gender && { gender: patient.gender }),
        ...(patient.address && { address: patient.address }),
        ...(patient.ssn && { ssn: patient.ssn })
      },
      provider: {
        npi: provider.npi,
        organizationName: provider.organizationName
      }
    };

    // Add encounter information if provided
    if (options?.encounterDate || options?.serviceTypeCodes) {
      request.encounter = {};

      if (options.encounterDate) {
        request.encounter.beginningDateOfService = formatDateForStedi(options.encounterDate);
      }

      if (options.serviceTypeCodes?.length) {
        request.encounter.serviceTypeCodes = options.serviceTypeCodes;
      }
    }

    return request;
  }

  /**
   * Convert raw API response to typed response
   */
  private convertResponse(raw: RawEligibilityResponse): EligibilityCheckResult {
    const { benefits, errors, subscriber, planStatus, controlNumber, eligibilitySearchId } = raw;

    // Check for errors first
    if (errors?.length) {
      return {
        response: {
          isEligible: false,
          hasActiveCoverage: false,
          summary: `Eligibility check failed: ${errors.map((error) => error.description || error.message).join(', ')}`,
          controlNumber,
          eligibilitySearchId,
          errors
        }
      };
    }

    // Check for active coverage in planStatus
    if (planStatus?.length) {
      const hasActiveCoverage = planStatus.some(
        (status) => status.statusCode === '1' || status.status?.includes('Active')
      );

      if (hasActiveCoverage) {
        const insuranceTypes =
          planStatus
            .map((status) => status.planDetails)
            .filter((detail): detail is string => Boolean(detail))
            .join(', ') || 'Commercial insurance';

        return {
          response: {
            isEligible: true,
            hasActiveCoverage: true,
            summary: 'Patient has active coverage',
            controlNumber,
            eligibilitySearchId,
            subscriber,
            benefits,
            insuranceTypes
          }
        };
      }
    }

    // Fallback: Check if benefits exist
    if (!benefits?.length) {
      return {
        response: {
          isEligible: false,
          hasActiveCoverage: false,
          summary: 'No benefits information returned',
          controlNumber,
          eligibilitySearchId,
          subscriber
        }
      };
    }

    // Check for active coverage from benefits
    const hasActiveBenefits = benefits.some((benefit) => {
      if (benefit.coverageStatus === 'Active' || benefit.coverageStatus === '1') {
        return true;
      }

      if (benefit.planDateQualifier && benefit.planDate) {
        return true;
      }

      return false;
    });

    // Check for specific insurance types
    const insuranceTypes = benefits
      .map((benefit) => benefit.insuranceType)
      .filter((type): type is string => Boolean(type))
      .join(', ');

    // Patient is eligible if they have active benefits
    const isEligible = hasActiveBenefits && !!benefits.length;

    return {
      response: {
        isEligible,
        hasActiveCoverage: isEligible,
        summary: isEligible ? 'Patient has active coverage' : 'Coverage status unclear',
        controlNumber,
        eligibilitySearchId,
        subscriber,
        benefits,
        insuranceTypes,
        planNumber: subscriber?.planNumber,
        groupNumber: subscriber?.groupNumber
      }
    };
  }
}
