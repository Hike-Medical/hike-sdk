import { StripeInvoice } from '../../../prisma/index';

export type StripeInvoiceExtended = StripeInvoice & {
  name?: string;
  facilityName?: string;
};
