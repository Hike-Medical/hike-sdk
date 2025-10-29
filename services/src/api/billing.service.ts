import type { StripeProduct, StripeProductType } from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

// Note: Many of the other billing services are located in `@hike/sdk-stripe`

/**
 * Fetch pricing information for a specific Stripe product type
 * @param stripeProductType - The type of Stripe product to fetch pricing for
 * @returns The Stripe product with pricing information, or null if not found
 */
export const fetchPricingByProductType = async (
  stripeProductType: StripeProductType
): Promise<StripeProduct | null> => {
  try {
    const response = await backendApi.get(`billing/pricing/${stripeProductType}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
