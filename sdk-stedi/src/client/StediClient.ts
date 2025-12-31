import { ExternalApiClient, Logger } from '@hike/sdk';
import { EligibilityClient } from './EligibilityClient';
import { MbiLookupClient } from './MbiLookupClient';
import { PayerClient } from './PayerClient';

export interface StediClientConfig {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
  logger: Logger;
}

export class StediClient extends ExternalApiClient {
  public readonly eligibility: EligibilityClient;
  public readonly mbiLookup: MbiLookupClient;
  public readonly payer: PayerClient;

  constructor(config: StediClientConfig) {
    if (!config.apiKey) {
      throw new Error('Stedi API key is required');
    }

    super({
      baseURL: config.baseURL || 'https://healthcare.us.stedi.com',
      timeoutMs: config.timeout || 20000,
      clientName: 'Stedi',
      logger: config.logger,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Key ${config.apiKey}`
      }
    });

    // Initialize sub-clients with the shared axios instance
    this.eligibility = new EligibilityClient(this.axiosInstance, config.logger);
    this.mbiLookup = new MbiLookupClient(this.axiosInstance, config.logger);
    this.payer = new PayerClient(this.axiosInstance, config.logger);
  }
}
