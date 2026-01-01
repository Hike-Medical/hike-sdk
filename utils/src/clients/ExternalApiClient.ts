import { Logger } from '@hike/types';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from 'axios';

export interface ExternalApiClientConfig {
  baseURL: string;
  timeoutMs?: number;
  maxRetries?: number;
  maxRetryDelayMs?: number;
  logger: Logger;
  clientName: string;
  headers?: Record<string, string>;
}

export interface RetryConfig {
  maxRetries: number;
  maxRetryDelay: number;
}

/**
 * Base class for external API clients with built-in retry logic,
 * exponential backoff, and structured logging.
 *
 * @example
 * ```typescript
 * class MyApiClient extends ExternalApiClient {
 *   constructor(apiKey: string, logger?: Logger) {
 *     super({
 *       baseURL: 'https://api.example.com',
 *       clientName: 'MyAPI',
 *       headers: { Authorization: `Bearer ${apiKey}` },
 *       logger
 *     });
 *   }
 *
 *   async getResource(id: string) {
 *     return this.get<Resource>(`/resources/${id}`);
 *   }
 * }
 * ```
 */
export abstract class ExternalApiClient {
  protected readonly axiosInstance: AxiosInstance;
  protected readonly logger: Logger;
  protected readonly clientName: string;
  protected readonly retryConfig: RetryConfig;

  protected constructor(config: ExternalApiClientConfig) {
    this.logger = config.logger;
    this.clientName = config.clientName || 'ExternalAPI';
    this.retryConfig = {
      maxRetries: config.maxRetries ?? 3,
      maxRetryDelay: config.maxRetryDelayMs ?? 10000
    };

    const axiosConfig: CreateAxiosDefaults = {
      baseURL: config.baseURL,
      timeout: config.timeoutMs ?? 15000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers
      }
    };

    this.axiosInstance = axios.create(axiosConfig);
    this.setupRetryInterceptor();
  }

  /**
   * Calculates the delay before the next retry using exponential backoff.
   * Delay doubles with each retry: 1s -> 2s -> 4s -> 8s, capped at maxRetryDelay.
   */
  protected calculateRetryDelay(retryCount: number): number {
    return Math.min(1000 * 2 ** retryCount, this.retryConfig.maxRetryDelay);
  }

  /**
   * Determines if a request should be retried based on the error.
   * By default, retries on network errors, timeouts, and 5xx server errors.
   * Override this method to customize retry behavior.
   */
  protected shouldRetry(error: AxiosError, retryCount: number): boolean {
    if (retryCount >= this.retryConfig.maxRetries) {
      return false;
    }

    // Retry on network errors (no response) or 5xx server errors
    const { response } = error;
    return !response || (response.status >= 500 && response.status < 600);
  }

  private setupRetryInterceptor(): void {
    const retryCountMap = new WeakMap<object, number>();

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const { config, response } = error;

        if (!config) {
          return Promise.reject(error);
        }

        const retryCount = retryCountMap.get(config) || 0;

        if (!this.shouldRetry(error, retryCount)) {
          return Promise.reject(error);
        }

        const nextRetryCount = retryCount + 1;
        retryCountMap.set(config, nextRetryCount);

        this.logger.log(`${this.clientName} API retry attempt ${nextRetryCount}`, {
          error: error.message,
          statusCode: response?.status,
          url: config.url
        });

        const delay = this.calculateRetryDelay(retryCount);
        await new Promise<void>((resolve) => {
          setTimeout(resolve, delay);
        });

        return this.axiosInstance.request(config);
      }
    );
  }

  /**
   * Performs a GET request.
   */
  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  /**
   * Performs a POST request.
   */
  protected async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  /**
   * Performs a PUT request.
   */
  protected async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  /**
   * Performs a PATCH request.
   */
  protected async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.patch<T>(url, data, config);
    return response.data;
  }

  /**
   * Performs a DELETE request.
   */
  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }
}
