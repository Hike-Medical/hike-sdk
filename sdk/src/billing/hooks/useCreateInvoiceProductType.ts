import { HikeError } from '@hike/services';
import { CreateFacilityParams, StripeProductType } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { Stripe } from 'stripe';
import { createInvoiceForProductType } from '../billing.service';

interface CreateInvoiceProductTypeContext {
  stripeProductType: StripeProductType;
  body: CreateFacilityParams;
}

export const useCreateInvoiceProductType = (
  options?: UseMutationOptions<Stripe.Checkout.Session, HikeError<null>, CreateInvoiceProductTypeContext>
) =>
  useMutation({
    mutationKey: ['createInvoiceProductType'],
    mutationFn: async ({ stripeProductType, body }) => await createInvoiceForProductType(stripeProductType, body),
    ...options
  });
