import { Logger } from '@hike/sdk';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { EligibilityClient } from './EligibilityClient';
import { MbiLookupClient } from './MbiLookupClient';
import { PayerClient } from './PayerClient';

export interface StediClientConfig {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
  logger?: Logger;
}

export class StediClient {
  protected readonly apiKey: string;
  protected readonly axiosInstance: AxiosInstance;
  protected readonly logger?: Logger;

  public readonly eligibility: EligibilityClient;
  public readonly mbiLookup: MbiLookupClient;
  public readonly payer: PayerClient;

  constructor(config: StediClientConfig) {
    if (!config.apiKey) {
      throw new Error('Stedi API key is required');
    }

    this.apiKey = config.apiKey;
    this.logger = config.logger;

    this.axiosInstance = axios.create({
      baseURL: config.baseURL || 'https://healthcare.us.stedi.com',
      timeout: config.timeout || 20000, // 20 seconds default
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Key ${this.apiKey}`
      }
    });

    // Configure retry interceptor for transient failures
    this.setupRetryInterceptor();

    // Initialize sub-clients
    this.eligibility = new EligibilityClient(this.axiosInstance, this.logger);
    this.mbiLookup = new MbiLookupClient(this.axiosInstance, this.logger);
    this.payer = new PayerClient(this.axiosInstance, this.logger);
  }

  private setupRetryInterceptor(): void {
    const maxRetries = 3;
    const retryDelay = (retryCount: number) => Math.min(1000 * 2 ** retryCount, 10000);
    const retryCountMap = new WeakMap<object, number>();

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const { config, response } = error;

        if (!config) {
          return Promise.reject(error);
        }

        const retryCount = retryCountMap.get(config) || 0;

        // Retry on network errors, timeouts, and 5xx errors
        const shouldRetry = retryCount < maxRetries && (!response || (response.status >= 500 && response.status < 600));

        if (!shouldRetry) {
          return Promise.reject(error);
        }

        const nextRetryCount = retryCount + 1;
        retryCountMap.set(config, nextRetryCount);

        this.logger?.log(`Stedi API retry attempt ${nextRetryCount}`, {
          error: error.message,
          statusCode: response?.status
        });

        await new Promise<void>((resolve) => {
          setTimeout(resolve, retryDelay(retryCount));
        });

        return this.axiosInstance.request(config);
      }
    );
  }
}
