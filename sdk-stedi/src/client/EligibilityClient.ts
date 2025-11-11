import { Logger } from '@hike/sdk';
import { AxiosInstance } from 'axios';
import { fromStediError } from '../errors/formatter';
import type {
  EligibilityCheckOptions,
  EligibilityCheckResult,
  EligibilityInterpretation,
  EligibilityRequest,
  EligibilityResponse
} from '../types/eligibility';
import type { PatientInput } from '../types/patient';
import type { Provider } from '../types/provider';
import { formatDateForStedi } from '../utils/date';

const ELIGIBILITY_ENDPOINT = '/2024-04-01/change/medicalnetwork/eligibility/v3';

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
      this.logger?.log('Stedi eligibility check initiated');

      const response = await this.axiosInstance.post<EligibilityResponse>(ELIGIBILITY_ENDPOINT, request);
      const interpretation = this.interpretResponse(response.data);

      this.logger?.log('Stedi eligibility check success', {
        isEligible: interpretation.isEligible,
        hasActiveCoverage: interpretation.hasActiveCoverage
      });

      return {
        raw: response.data,
        interpretation
      };
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
  ): EligibilityRequest {
    const request: EligibilityRequest = {
      controlNumber: this.generateControlNumber('ELG'),
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

      if (options.serviceTypeCodes && options.serviceTypeCodes.length > 0) {
        request.encounter.serviceTypeCodes = options.serviceTypeCodes;
      }
    }

    return request;
  }

  /**
   * Interpret eligibility response
   */
  private interpretResponse(response: any): EligibilityInterpretation {
    const { benefits, errors, subscriber, planStatus } = response;

    // Check for errors first
    if (errors?.length) {
      return {
        isEligible: false,
        hasActiveCoverage: false,
        summary: `Eligibility check failed: ${errors.map((e: any) => e.description || e.message).join(', ')}`,
        details: { errors }
      };
    }

    // Check for active coverage in planStatus
    if (planStatus?.length) {
      const hasActiveCoverage = planStatus.some(
        (status: any) => status.statusCode === '1' || status.status?.includes('Active')
      );

      if (hasActiveCoverage) {
        const insuranceTypes =
          planStatus
            .map((s: any) => s.planDetails)
            .filter((d: string) => d)
            .join(', ') || 'Commercial insurance';

        return {
          isEligible: true,
          hasActiveCoverage: true,
          summary: `Patient has active coverage`,
          details: {
            subscriber,
            benefits: planStatus,
            insuranceTypes
          }
        };
      }
    }

    // Fallback: Check if benefits exist
    if (!benefits?.length) {
      return {
        isEligible: false,
        hasActiveCoverage: false,
        summary: 'No benefits information returned',
        details: { subscriber }
      };
    }

    // Check for active coverage from benefits
    const hasActiveBenefits = benefits.some((b: any) => {
      if (b.coverageStatus === 'Active' || b.coverageStatus === '1') {
        return true;
      }
      if (b.planDateQualifier && b.planDate) {
        return true;
      }
      return true;
    });

    // Check for specific insurance types
    const insuranceTypes = benefits
      .map((b: any) => b.insuranceType)
      .filter((type: any) => type)
      .join(', ');

    const isEligible = hasActiveBenefits && benefits.length > 0;
    const hasActiveCoverage = isEligible;

    return {
      isEligible,
      hasActiveCoverage,
      summary: isEligible ? 'Patient has active coverage' : 'Coverage status unclear',
      details: {
        subscriber,
        benefits,
        insuranceTypes,
        planNumber: subscriber?.planNumber,
        groupNumber: subscriber?.groupNumber
      }
    };
  }

  /**
   * Generate a unique control number for tracking requests
   */
  private generateControlNumber(prefix = 'REQ'): string {
    return `${prefix}${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }
}
