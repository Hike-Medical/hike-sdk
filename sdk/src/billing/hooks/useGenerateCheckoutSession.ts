import { HikeError } from '@hike/services';
import { CheckoutSessionParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { Stripe } from 'stripe';
import { generateCheckoutSession } from '../billing.service';

interface GenerateCheckoutSessionContext {
  workbenchId: string;
  params: CheckoutSessionParams;
}

export const useGenerateCheckoutSession = (
  options?: UseMutationOptions<Stripe.Checkout.Session, HikeError<null>, GenerateCheckoutSessionContext>
) => {
  return useMutation({
    mutationKey: ['generateCheckoutSession'],
    mutationFn: async ({ workbenchId, params }: GenerateCheckoutSessionContext) =>
      await generateCheckoutSession(workbenchId, params),
    ...options
  });
};
