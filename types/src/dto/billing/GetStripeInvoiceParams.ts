import { StripeInvoiceType } from '../../../prisma/index';
import { PagedParams } from '../PagedParams';

export interface GetStripeInvoiceParams extends PagedParams {
  subscriptionId?: string;
  combinedInvoiceId?: string;
  invoiceId?: string;
  stripeEntityId?: string;
  term?: string;
  type?: StripeInvoiceType;
  currentCycleSubscription?: string;
}