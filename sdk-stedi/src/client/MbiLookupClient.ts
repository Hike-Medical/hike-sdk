import { Logger } from '@hike/sdk';
import { AxiosInstance } from 'axios';
import { randomUUID } from 'crypto';
import { fromStediError } from '../errors/formatter';
import type { MbiLookupRequest, MbiLookupResult } from '../types/mbi';
import { formatDateForStedi } from '../utils/date';

const MBI_LOOKUP_ENDPOINT = '/2024-04-01/change/medicalnetwork/eligibility/v3';
const MBI_TRADING_PARTNER = 'MBILU';

interface RawMbiLookupResponse {
  controlNumber: string;
  eligibilitySearchId?: string;
  subscriber?: {
    memberId?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
  };
}

export class MbiLookupClient {
  constructor(
    private readonly axiosInstance: AxiosInstance,
    private readonly logger?: Logger
  ) {}

  /**
   * Look up Medicare Beneficiary Identifier (MBI) using SSN
   * @throws {HikeError} with formatted Stedi error details
   */
  async lookup(request: MbiLookupRequest): Promise<MbiLookupResult> {
    try {
      const payload = this.buildRequest(request);
      const { controlNumber } = payload;

      this.logger?.log('MBI lookup initiated', { controlNumber });

      const response = await this.axiosInstance.post<RawMbiLookupResponse>(MBI_LOOKUP_ENDPOINT, payload, {
        headers: { 'X-Stedi-Control-Number': controlNumber }
      });

      const result = this.convertResponse(response.data);

      this.logger?.debug('MBI lookup response', {
        controlNumber,
        result,
        raw: response.data
      });

      this.logger?.log('MBI lookup success', {
        controlNumber,
        mbi: result.response.mbi,
        eligibilitySearchId: result.response.eligibilitySearchId
      });

      return result;
    } catch (error: unknown) {
      const hikeError = fromStediError(error);

      this.logger?.error('MBI lookup failed', {
        message: hikeError.message,
        errorCode: hikeError.errorCode,
        statusCode: hikeError.statusCode,
        formattedErrors: hikeError.data
      });

      throw hikeError;
    }
  }

  /**
   * Build MBI lookup request payload
   */
  private buildRequest(request: MbiLookupRequest) {
    return {
      controlNumber: randomUUID(),
      tradingPartnerServiceId: MBI_TRADING_PARTNER,
      provider: {
        organizationName: request.organizationName || 'Provider Organization',
        npi: request.npi || '1999999984'
      },
      subscriber: {
        lastName: request.lastName,
        dateOfBirth: formatDateForStedi(request.dateOfBirth),
        ssn: request.ssn
      },
      encounter: {
        serviceTypeCodes: ['30']
      }
    };
  }

  /**
   * Convert raw API response to typed response
   */
  private convertResponse(raw: RawMbiLookupResponse): MbiLookupResult {
    return {
      response: {
        mbi: raw.subscriber?.memberId,
        firstName: raw.subscriber?.firstName,
        lastName: raw.subscriber?.lastName,
        dateOfBirth: raw.subscriber?.dateOfBirth || '',
        controlNumber: raw.controlNumber,
        eligibilitySearchId: raw.eligibilitySearchId
      }
    };
  }
}
