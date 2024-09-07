import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { Stripe } from 'stripe';
import { fetchStripeInvoice } from '../../api/billing.service';
import { ResponseError } from '../../errors/ResponseError';

interface StripeInvoiceContext {
  stripeInvoiceId: string;
}

export const useStripeInvoice = (
  options?: UseMutationOptions<Stripe.Invoice, ResponseError<null>, StripeInvoiceContext>
) => {
  return useMutation({
    mutationKey: ['stripeInvoice'],
    mutationFn: async ({ stripeInvoiceId }: StripeInvoiceContext) => await fetchStripeInvoice(stripeInvoiceId),
    ...options
  });
};
