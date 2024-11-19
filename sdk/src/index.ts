import * as services from '@hike/services';
import { configureServices } from '@hike/services';
import type { HikeConfig } from '@hike/types';
import * as utils from '@hike/utils';

export default {
  /**
   * Configures the Hike SDK.
   */
  init: (config: HikeConfig) => {
    const safeConfig = configureServices(config);

    return {
      /**
       * Configurations set on the Hike SDK that is safe to pass to client-side providers
       * since it removes sensitive information like the API key.
       */
      safeConfig,
      /**
       * Module that contains services to call API endpoints.
       */
      services,
      /**
       * Module that contains convenient helpers and utilities.
       */
      utils
    };
  }
};

// Export functionality from SDK for external use
export * from '@hike/services';
export type * from '@hike/types'; // eslint-disable-line import/export
export * from '@hike/utils';

// Export platform specific functionality
export * from './auth/extractToken';
export * from './auth/verifyToken';
export * from './billing/hooks/useGenerateCheckoutSession';
export * from './billing/hooks/useGenerateCheckoutSessionInfo';
export * from './billing/hooks/useGetBillingOverview';
export * from './billing/hooks/useGetStripeEntities';
export * from './billing/hooks/useGetStripeInvoice';
export * from './billing/hooks/useGetSubscriptionInvoiceStats';
export * from './billing/hooks/useGetUpFrontPaymentInfo';
export * from './billing/hooks/useInvoices';
export * from './billing/stripe-service';
