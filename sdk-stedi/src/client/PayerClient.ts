import { Logger } from '@hike/sdk';
import { AxiosInstance } from 'axios';
import { fromStediError } from '../errors/formatter';
import type { Payer, PayerSearchItem, PayerSearchOptions } from '../types/payer';

const PAYER_SEARCH_ENDPOINT = '/2024-04-01/payers/search';

interface RawPayerSearchResponse {
  items: PayerSearchItem[];
  stats?: {
    total: number;
    returned: number;
  };
  nextPageToken?: string;
}

export class PayerClient {
  constructor(
    private readonly axiosInstance: AxiosInstance,
    private readonly logger?: Logger
  ) {}

  /**
   * Search for a payer by name
   * @param name - Payer name to search for
   * @param options - Optional search filters
   * @returns Single payer result
   * @throws {HikeError} with formatted Stedi error details
   */
  async fetchByName(name: string, options?: PayerSearchOptions): Promise<Payer> {
    try {
      if (!name || name.trim().length === 0) {
        throw new Error('Payer name is required');
      }

      this.logger?.log('Payer search by name initiated', { name, options });

      const params = this.buildSearchParams(name.trim(), options);
      const queryString = this.serializeParams(params);
      const url = `${PAYER_SEARCH_ENDPOINT}?${queryString}`;

      const response = await this.axiosInstance.get<RawPayerSearchResponse>(url);

      if (!response.data?.items.length) {
        throw new Error(`No payer found with name: ${name}`);
      }

      const payer = response.data.items[0]?.payer;

      if (!payer) {
        throw new Error(`No payer data found for name: ${name}`);
      }

      this.logger?.log('Payer search by name successful', {
        displayName: payer.displayName,
        stediId: payer.stediId
      });

      return {
        ...payer,
        id: payer.primaryPayerId
      };
    } catch (error: unknown) {
      const hikeError = fromStediError(error);

      this.logger?.error('Payer search by name failed', {
        name,
        message: hikeError.message,
        errorCode: hikeError.errorCode,
        statusCode: hikeError.statusCode
      });

      throw hikeError;
    }
  }

  /**
   * Get payer by Stedi ID or Payer ID
   * @param payerId - Stedi ID (e.g., "KRPCH") or Payer ID (e.g., "00710")
   * @returns Single payer result
   * @throws {HikeError} with formatted Stedi error details
   */
  async fetchById(payerId: string): Promise<Payer> {
    try {
      if (!payerId || payerId.trim().length === 0) {
        throw new Error('Payer ID is required');
      }

      this.logger?.log('Payer lookup by ID initiated', { payerId });

      const params = {
        query: payerId.trim(),
        pageSize: 1
      };

      const queryString = this.serializeParams(params);
      const url = `${PAYER_SEARCH_ENDPOINT}?${queryString}`;

      const response = await this.axiosInstance.get<RawPayerSearchResponse>(url);

      if (!response.data?.items.length) {
        throw new Error(`No payer found with ID: ${payerId}`);
      }

      const payer = response.data.items[0]?.payer;

      if (!payer) {
        throw new Error(`No payer data found for ID: ${payerId}`);
      }

      this.logger?.log('Payer lookup by ID successful', {
        displayName: payer.displayName,
        stediId: payer.stediId,
        primaryPayerId: payer.primaryPayerId
      });

      return {
        ...payer,
        id: payer.primaryPayerId
      };
    } catch (error: unknown) {
      const hikeError = fromStediError(error);

      this.logger?.error('Payer lookup by ID failed', {
        payerId,
        message: hikeError.message,
        errorCode: hikeError.errorCode,
        statusCode: hikeError.statusCode
      });

      throw hikeError;
    }
  }

  /**
   * Build search parameters
   */
  private buildSearchParams(query: string, options?: PayerSearchOptions): Record<string, unknown> {
    const params: Record<string, unknown> = {
      query,
      pageSize: 10
    };

    if (options?.eligibilityCheck) {
      params.eligibilityCheck = options.eligibilityCheck;
    }

    if (options?.claimStatus) {
      params.claimStatus = options.claimStatus;
    }

    if (options?.professionalClaimSubmission) {
      params.professionalClaimSubmission = options.professionalClaimSubmission;
    }

    if (options?.coverageTypes && options.coverageTypes.length > 0) {
      params.coverageTypes = options.coverageTypes;
    }

    return params;
  }

  /**
   * Custom parameter serialization for array handling
   * Stedi API expects arrays as repeated parameters: coverageTypes=medical&coverageTypes=dental
   */
  private serializeParams(params: Record<string, unknown>): string {
    const encodeParam = (key: string, value: string | number) =>
      `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;

    const queryString = Object.entries(params)
      .flatMap(([key, value]) => {
        if (value === undefined || value === null) return [];
        if (Array.isArray(value)) return value.map((item) => encodeParam(key, item));
        return [encodeParam(key, value as string | number)];
      })
      .join('&');

    return queryString;
  }
}
