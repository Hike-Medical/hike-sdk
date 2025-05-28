import { healthCheck } from '@hike/services';
import { HikeError } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export const useGetHealth = (queryOptions?: UseQueryOptions<{ status: string; version: string }, HikeError<null>>) =>
  useQuery({
    queryKey: ['health'],
    queryFn: async () => await healthCheck(),
    ...queryOptions
  });
