/**
 * Claims API Client
 * Handles claim submission and status checking operations
 * API Reference: https://www.stedi.com/docs/healthcare/submit-professional-claims
 */

import { Logger } from '@hike/sdk';
import { isAxiosError, type AxiosInstance } from 'axios';
import type {
  ClaimRequest,
  ClaimResponse,
  ClaimStatusRequest,
  ClaimStatusResponse,
  ClaimStatusResult,
  ClaimSubmissionResult
} from '../types/claims';

const CLAIMS_SUBMIT_ENDPOINT = '/2024-04-01/change/medicalnetwork/professionalclaims/v3/submission';
const CLAIMS_STATUS_ENDPOINT = '/2024-04-01/change/medicalnetwork/claimstatus/v3/request';

export class ClaimsClient {
  constructor(
    private readonly axiosInstance: AxiosInstance,
    private readonly logger?: Logger
  ) {}

  /**
   * Submit a professional claim
   * API Reference: https://www.stedi.com/docs/healthcare/submit-professional-claims
   *
   * @param claim - Claim data including subscriber, provider, and service line information
   */
  async submitClaim(claim: ClaimRequest): Promise<ClaimSubmissionResult> {
    try {
      if (!claim.tradingPartnerServiceId) {
        return {
          success: false,
          error: 'Trading partner service ID is required'
        };
      }

      if (!claim.subscriber) {
        return {
          success: false,
          error: 'Subscriber information is required'
        };
      }

      if (!claim.billing?.npi) {
        return {
          success: false,
          error: 'Billing provider NPI is required'
        };
      }

      if (!claim.claimInformation.serviceLines || claim.claimInformation.serviceLines.length === 0) {
        return {
          success: false,
          error: 'At least one service line is required'
        };
      }

      this.logger?.log('Submitting professional claim', {
        controlNumber: claim.controlNumber,
        tradingPartnerServiceId: claim.tradingPartnerServiceId,
        patient: `${claim.subscriber.firstName} ${claim.subscriber.lastName}`,
        serviceLineCount: claim.claimInformation.serviceLines.length
      });

      const response = await this.axiosInstance.post<ClaimResponse>(CLAIMS_SUBMIT_ENDPOINT, claim);

      this.logger?.log('Claim submitted successfully', {
        controlNumber: claim.controlNumber,
        claimId: response.data.claimId,
        status: response.data.status
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data;

        this.logger?.error('Stedi API error during claim submission', {
          status: error.response.status,
          data: errorData,
          controlNumber: claim.controlNumber
        });

        return {
          success: false,
          error: 'API_ERROR',
          errorDetails: {
            status: error.response.status,
            message: errorData.message || 'Failed to submit claim',
            code: errorData.code,
            errors: errorData.errors
          }
        };
      }

      if (error instanceof Error) {
        this.logger?.error('Claim submission failed', { message: error.message });
        return {
          success: false,
          error: error.message
        };
      }

      this.logger?.error('Unexpected error during claim submission', { error: String(error) });
      return {
        success: false,
        error: String(error)
      };
    }
  }

  /**
   * Check the status of a submitted claim
   * API Reference: https://www.stedi.com/docs/healthcare/real-time-claim-status
   *
   * @param statusRequest - Claim status request including subscriber and claim identification details
   */
  async checkClaimStatus(statusRequest: ClaimStatusRequest): Promise<ClaimStatusResult> {
    try {
      if (!statusRequest.tradingPartnerServiceId) {
        return {
          success: false,
          error: 'Trading partner service ID is required'
        };
      }

      if (!statusRequest.subscriber) {
        return {
          success: false,
          error: 'Subscriber information is required'
        };
      }

      if (!statusRequest.informationReceiver?.npi) {
        return {
          success: false,
          error: 'Information receiver NPI is required'
        };
      }

      this.logger?.log('Checking claim status', {
        tradingPartnerServiceId: statusRequest.tradingPartnerServiceId,
        subscriber: `${statusRequest.subscriber.firstName} ${statusRequest.subscriber.lastName}`,
        memberId: statusRequest.subscriber.memberId,
        claimId: statusRequest.encounter?.claimId
      });

      const response = await this.axiosInstance.post<ClaimStatusResponse>(CLAIMS_STATUS_ENDPOINT, statusRequest);

      this.logger?.log('Claim status retrieved successfully', {
        tradingPartnerServiceId: statusRequest.tradingPartnerServiceId,
        status: response.data.status,
        claimStatusCode: response.data.statusDetails?.claimStatusCode
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data;

        this.logger?.error('Stedi API error during claim status check', {
          status: error.response.status,
          data: errorData
        });

        return {
          success: false,
          error: 'API_ERROR',
          errorDetails: {
            status: error.response.status,
            message: errorData.message || 'Failed to check claim status',
            code: errorData.code,
            errors: errorData.errors
          }
        };
      }

      if (error instanceof Error) {
        this.logger?.error('Claim status check failed', { message: error.message });
        return {
          success: false,
          error: error.message
        };
      }

      this.logger?.error('Unexpected error during claim status check', { error: String(error) });
      return {
        success: false,
        error: String(error)
      };
    }
  }
}
