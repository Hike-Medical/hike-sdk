import { getConfigurations } from '@hike/services';
import { Configuration, HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseConfigurationsOptions
  extends Omit<UseQueryOptions<Configuration[], HikeError<null>>, 'queryFn' | 'queryKey'> {
  queryKey?: QueryKey;
}

export const useConfigurations = ({ queryKey = [], ...options }: UseConfigurationsOptions = {}) =>
  useQuery<Configuration[], HikeError<null>>({
    queryKey: ['configurations', queryKey],
    queryFn: async () => await getConfigurations(),
    ...options
  });

