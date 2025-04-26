import { HikeError } from '@hike/sdk';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { Stripe } from 'stripe';
import { fetchStripeInvoice } from '../api/billing.service';

interface StripeInvoiceContext {
  stripeInvoiceId: string;
}

export const useStripeInvoice = (
  options?: UseMutationOptions<Stripe.Invoice, HikeError<null>, StripeInvoiceContext>
) => {
  return useMutation({
    mutationKey: ['stripeInvoice'],
    mutationFn: async ({ stripeInvoiceId }) => await fetchStripeInvoice(stripeInvoiceId),
    ...options
  });
};
