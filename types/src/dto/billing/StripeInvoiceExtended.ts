import { StripeInvoice } from '@prisma/client';

export type StripeInvoiceExtended = StripeInvoice & {
  name?: string;
  facilityName?: string;
};
