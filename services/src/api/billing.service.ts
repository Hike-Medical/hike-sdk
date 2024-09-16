import {
  BillingOverview,
  GetStripeInvoiceParams,
  PagedResponse,
  StripeInvoiceExtended,
  UpFrontPaymentInfo
} from '@hike/types';
import { Stripe } from 'stripe';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const getStripeEntities = async () => {
  try {
    const response = await backendApi.get(`billing/entities`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getStripeSubscriptionStats = async (stripeEntityId: string) => {
  try {
    const response = await backendApi.get(`billing/subscription/stats/${stripeEntityId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchInvoices = async (
  params?: GetStripeInvoiceParams
): Promise<PagedResponse<StripeInvoiceExtended[]>> => {
  try {
    const response = await backendApi.get('billing/invoices', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchStripeInvoice = async (stripeInvoiceId: string): Promise<Stripe.Invoice> => {
  try {
    const response = await backendApi.post(`billing/invoice/stripe/${stripeInvoiceId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getUpFrontPaymentInfo = async (stripeInvoiceId: string): Promise<UpFrontPaymentInfo | null> => {
  try {
    const response = await backendApi.get(`billing/up-front-payment/${stripeInvoiceId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getBillingOverview = async (stripeInvoiceId: string): Promise<BillingOverview> => {
  try {
    const response = await backendApi.get(`billing/overview/${stripeInvoiceId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
