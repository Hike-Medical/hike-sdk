import { findApiKeys } from '@hike/services';
import type { ApiKey, HikeError } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export const useApiKeys = (options?: Omit<UseQueryOptions<ApiKey[], HikeError<null>>, 'queryKey' | 'queryFn'>) =>
  useQuery({
    queryKey: ['apiKeys'],
    queryFn: async () => await findApiKeys(),
    ...options
  });
