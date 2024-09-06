import { GetStripeInvoiceParams, PagedResponse, StripeInvoiceExtended } from '@hike/types';
import { Stripe } from 'stripe';
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
    const response = await backendApi.get(`billing/subscription/stats/${stripeEntityId}`);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const fetchInvoices = async (
  params?: GetStripeInvoiceParams
): Promise<PagedResponse<StripeInvoiceExtended[]>> => {
  try {
    const response = await backendApi.get('billing/invoices', { params });
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const fetchStripeInvoice = async (stripeInvoiceId: string): Promise<Stripe.Invoice> => {
  try {
    const response = await backendApi.post(`billing/invoice/stripe/${stripeInvoiceId}`);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};
