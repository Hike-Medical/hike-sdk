import { HikeError } from '@hike/sdk';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { Stripe } from 'stripe';
import { createPaymentIntent } from '../api/billing.service';

interface UseCreatePaymentIntentOptions
  extends Omit<UseQueryOptions<Stripe.PaymentIntent, HikeError<null>>, 'queryKey' | 'queryFn'> {
  workbenchId: string;
  captureMethod?: Stripe.PaymentIntent.CaptureMethod;
  queryKey?: QueryKey;
}

export const useCreatePaymentIntent = ({
  queryKey = [],
  workbenchId,
  captureMethod,
  ...options
}: UseCreatePaymentIntentOptions) =>
  useQuery({
    queryKey: ['createPaymentIntent', workbenchId, captureMethod, queryKey],
    queryFn: async () => await createPaymentIntent(workbenchId, captureMethod),
    ...options
  });
