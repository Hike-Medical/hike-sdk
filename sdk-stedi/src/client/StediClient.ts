import { Logger } from '@hike/sdk';
import axios, { AxiosInstance } from 'axios';

import { EligibilityClient } from './EligibilityClient';

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

  constructor(config: StediClientConfig) {
    if (!config.apiKey) {
      throw new Error('Stedi API key is required');
    }

    this.apiKey = config.apiKey;
    this.logger = config.logger;

    this.axiosInstance = axios.create({
      baseURL: config.baseURL || 'https://healthcare.us.stedi.com',
      timeout: config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Key ${this.apiKey}`
      }
    });

    // Initialize sub-clients
    this.eligibility = new EligibilityClient(this.axiosInstance, this.logger);
  }
}
