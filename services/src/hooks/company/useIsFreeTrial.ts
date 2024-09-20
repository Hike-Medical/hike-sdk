import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { isFreeTrial } from '../../api/company.service';
import { HikeError } from '../../errors/HikeError';

export interface useIsFreeTrialOptions extends Omit<UseQueryOptions<boolean, HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useIsFreeTrial = ({ queryKey = [], ...options }: useIsFreeTrialOptions) =>
  useQuery({
    queryKey: ['isFreeTrial', queryKey],
    queryFn: async () => await isFreeTrial(),
    ...options
  });
