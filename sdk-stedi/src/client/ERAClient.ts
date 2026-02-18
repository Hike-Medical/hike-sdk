/**
 * ERA (Electronic Remittance Advice) API Client
 * Handles retrieval and processing of payment remittance advice (835 transactions)
 * API Reference: https://www.stedi.com/docs/healthcare/electronic-remittance-advice
 */

import { Logger } from '@hike/sdk';
import { isAxiosError, type AxiosInstance } from 'axios';
import type {
    ERA,
    ERAForClaimResult,
    ERAListResponse,
    ERAListResult,
    ERAPDFResult,
    ERARequest,
    ERAResult
} from '../types/era';

const ERA_ENDPOINT = '/2024-04-01/x12/remittance-advice';

export class ERAClient {
  constructor(
    private readonly axiosInstance: AxiosInstance,
    private readonly logger?: Logger
  ) {}

  /**
   * List ERAs with optional filters
   *
   * @param request - Optional filters for date range, trading partner, claim ID
   */
  async listERAs(request?: ERARequest): Promise<ERAListResult> {
    try {
      const params: Record<string, string> = {};

      if (request?.tradingPartnerServiceId) {
        params.tradingPartnerServiceId = request.tradingPartnerServiceId;
      }
      if (request?.startDate) {
        params.startDate = request.startDate;
      }
      if (request?.endDate) {
        params.endDate = request.endDate;
      }
      if (request?.claimId) {
        params.claimId = request.claimId;
      }
      if (request?.checkNumber) {
        params.checkNumber = request.checkNumber;
      }

      this.logger?.log('Listing ERAs', { params });

      const response = await this.axiosInstance.get<ERAListResponse>(ERA_ENDPOINT, { params });

      this.logger?.log('ERAs retrieved successfully', {
        count: response.data.items?.length ?? 0,
        total: response.data.pagination?.totalCount
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error: unknown) {
      return this.handleError(error, 'list ERAs');
    }
  }

  /**
   * Get a specific ERA by ID
   *
   * @param eraId - The ERA ID to retrieve
   */
  async getERA(eraId: string): Promise<ERAResult> {
    try {
      if (!eraId || eraId.trim().length === 0) {
        return { success: false, error: 'ERA ID is required' };
      }

      this.logger?.log('Getting ERA', { eraId });

      const response = await this.axiosInstance.get<ERA>(`${ERA_ENDPOINT}/${eraId}`);

      this.logger?.log('ERA retrieved successfully', {
        eraId,
        payerName: response.data.payerName,
        checkNumber: response.data.checkOrEftNumber,
        paymentAmount: response.data.totalActualProviderPaymentAmount
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error: unknown) {
      return this.handleError(error, 'get ERA');
    }
  }

  /**
   * Get ERAs associated with a specific claim
   *
   * @param claimId - The Stedi claim ID to find ERAs for
   */
  async getERAForClaim(claimId: string): Promise<ERAForClaimResult> {
    try {
      if (!claimId || claimId.trim().length === 0) {
        return { success: false, error: 'Claim ID is required' };
      }

      this.logger?.log('Getting ERA for claim', { claimId });

      const listResult = await this.listERAs({ claimId });

      if (!listResult.success || !listResult.data) {
        return {
          success: false,
          error: listResult.error ?? 'Failed to retrieve ERAs for claim',
          errorDetails: listResult.errorDetails
        };
      }

      const matchingERAs = listResult.data.items.filter((era) =>
        era.claimPayments?.some(
          (cp) =>
            cp.claimId === claimId ||
            cp.patientControlNumber === claimId ||
            cp.payerClaimControlNumber === claimId
        )
      );

      this.logger?.log('ERAs for claim retrieved', {
        claimId,
        eraCount: matchingERAs.length
      });

      return {
        success: true,
        data: matchingERAs
      };
    } catch (error: unknown) {
      return this.handleError(error, 'get ERA for claim');
    }
  }

  /**
   * Download ERA as PDF
   *
   * @param eraId - The ERA ID to download
   */
  async downloadERAPDF(eraId: string): Promise<ERAPDFResult> {
    try {
      if (!eraId || eraId.trim().length === 0) {
        return { success: false, error: 'ERA ID is required' };
      }

      this.logger?.log('Requesting ERA PDF', { eraId });

      const response = await this.axiosInstance.get(`${ERA_ENDPOINT}/${eraId}/pdf`);

      this.logger?.log('ERA PDF URL generated', {
        eraId,
        expiresAt: response.data.expiresAt
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error: unknown) {
      return this.handleError(error, 'download ERA PDF');
    }
  }

  /**
   * Poll for ERA after claim submission.
   * Stedi test payer generates mock ERAs within seconds; real payers take days.
   *
   * @param claimId - The Stedi claim ID to poll for
   * @param options - Polling options
   */
  async pollForERA(
    claimId: string,
    options?: { maxAttempts?: number; delayMs?: number }
  ): Promise<ERAResult> {
    const maxAttempts = options?.maxAttempts ?? 10;
    const delayMs = options?.delayMs ?? 2000;

    try {
      this.logger?.log('Polling for ERA', { claimId, maxAttempts, delayMs });

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        if (attempt > 1) {
          await new Promise((resolve) => setTimeout(resolve, delayMs));
        }

        this.logger?.debug?.(`Polling attempt ${attempt}/${maxAttempts}`, { claimId });

        const result = await this.getERAForClaim(claimId);

        if (result.success && result.data && result.data.length > 0) {
          this.logger?.log('ERA found', { claimId, attempt });
          return {
            success: true,
            data: result.data[0]
          };
        }
      }

      this.logger?.warn('ERA polling timeout', { claimId, maxAttempts });
      return {
        success: false,
        error: `ERA not found after ${maxAttempts} attempts (${(maxAttempts * delayMs) / 1000}s)`
      };
    } catch (error: unknown) {
      return this.handleError(error, 'poll for ERA');
    }
  }

  /**
   * Common error handler following SDK conventions
   */
  private handleError<T extends { success: boolean; error?: string; errorDetails?: unknown }>(
    error: unknown,
    operation: string
  ): T {
    if (isAxiosError(error) && error.response?.data) {
      const errorData = error.response.data;

      this.logger?.error(`Stedi API error during ${operation}`, {
        status: error.response.status,
        data: errorData
      });

      return {
        success: false,
        error: 'API_ERROR',
        errorDetails: {
          status: error.response.status,
          message: errorData.message || `Failed to ${operation}`,
          code: errorData.code,
          errors: errorData.errors
        }
      } as T;
    }

    if (error instanceof Error) {
      this.logger?.error(`${operation} failed`, { message: error.message });
      return { success: false, error: error.message } as T;
    }

    this.logger?.error(`Unexpected error during ${operation}`, { error: String(error) });
    return { success: false, error: String(error) } as T;
  }
}
