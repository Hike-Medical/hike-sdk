import { isFreeTrial } from '@hike/services';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseIsFreeTrialOptions extends Omit<UseQueryOptions<boolean, HikeError<null>>, 'queryKey' | 'queryFn'> {
  facilityId?: string;
  queryKey?: QueryKey;
}

export const useIsFreeTrial = ({ facilityId, queryKey = [], ...options }: UseIsFreeTrialOptions = {}) =>
  useQuery({
    queryKey: ['isFreeTrial', facilityId, queryKey],
    queryFn: async () => await isFreeTrial(facilityId),
    ...options
  });
