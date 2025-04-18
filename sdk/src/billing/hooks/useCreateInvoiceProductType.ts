import { HikeError } from '@hike/services';
import { StripeProductType } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { Stripe } from 'stripe';
import { createInvoiceForProductType } from '../billing.service';

interface CreateInvoiceProductTypeContext {
  stripeProductType: StripeProductType;
}

export const useCreateInvoiceProductType = (
  options?: UseMutationOptions<Stripe.Checkout.Session, HikeError<null>, CreateInvoiceProductTypeContext>
) =>
  useMutation({
    mutationKey: ['createInvoiceProductType'],
    mutationFn: async ({ stripeProductType }) => await createInvoiceForProductType(stripeProductType),
    ...options
  });
