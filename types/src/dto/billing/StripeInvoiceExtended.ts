import { StripeInvoice } from '../../../prisma';

export type StripeInvoiceExtended = StripeInvoice & {
  name?: string;
  facilityName?: string;
};
