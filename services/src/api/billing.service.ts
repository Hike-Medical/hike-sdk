import { toResponseError } from '../errors/ResponseError';
import { backendApi } from '../utils/backendApi';

export const getStripeEntities = async () => {
  try {
    const response = await backendApi.get(`billing/entities`);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const getStripeSubscriptionStats = async (stripeEntityId: string) => {
  try {
    const response = await backendApi.get(`billing/subscription/invoices/${stripeEntityId}`);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};
