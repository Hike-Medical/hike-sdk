import {
  backendApi,
  BillingOverview,
  CheckoutProduct,
  CheckoutSessionParams,
  CreateFacilityParams,
  GetStripeInvoiceParams,
  PagedResponse,
  StripeInvoiceExtended,
  StripeProduct,
  StripeProductType,
  toHikeError,
  UpFrontPaymentInfo,
  WorkbenchGenerateInvoiceParams
} from '@hike/sdk';
import { Stripe } from 'stripe';

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

export const generateCheckoutSession = async (workbenchId: string, params: CheckoutSessionParams) => {
  try {
    const response = await backendApi.post(`billing/generate-checkout-session/${workbenchId}`, params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const createPaymentIntent = async (
  workbenchId: string,
  captureMethod?: 'automatic' | 'manual'
) => {
  try {
    const response = await backendApi.post(`billing/create-payment-intent/${workbenchId}`, { captureMethod });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const createInvoiceForProductType = async (stripeProductType: StripeProductType, body: CreateFacilityParams) => {
  try {
    const response = await backendApi.post(`billing/invoice/${stripeProductType}`, body);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const generateCheckoutSessionInfo = async (workbenchId: string) => {
  try {
    const response = await backendApi.get(`billing/checkout-session-info/${workbenchId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const createSetupIntentForCompany = async () => {
  try {
    const response = await backendApi.get(`billing/generate-setup-session`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchPricing = async () => {
  try {
    const response = await backendApi.get(`billing/pricing`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

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

export const generateInvoice = async (
  workbenchId: string,
  data: WorkbenchGenerateInvoiceParams
): Promise<CheckoutProduct[]> => {
  try {
    const response = await backendApi.post(`billing/workbench/${workbenchId}/generate-invoice`, data);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
