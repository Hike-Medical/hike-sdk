import { isFreeTrial } from '@hike/services';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseIsFreeTrialOptions extends Omit<UseQueryOptions<boolean, HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useIsFreeTrial = ({ queryKey = [], ...options }: UseIsFreeTrialOptions = {}) =>
  useQuery({
    queryKey: ['isFreeTrial', queryKey],
    queryFn: async () => await isFreeTrial(),
    ...options
  });
