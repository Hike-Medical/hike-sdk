import { HikeError } from '@hike/sdk';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { Stripe } from 'stripe';
import { createSetupIntentForCompany } from '../api/billing.service';

interface UseCreateSetupIntentOptions
  extends Omit<UseQueryOptions<Stripe.SetupIntent, HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useCreateSetupIntent = ({ queryKey = [], ...options }: UseCreateSetupIntentOptions) =>
  useQuery({
    queryKey: ['createSetupIntent', queryKey],
    queryFn: async () => await createSetupIntentForCompany(),
    ...options
  });
