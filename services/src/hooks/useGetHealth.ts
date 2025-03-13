import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { healthCheck } from '../api/health.service';
import { HikeError } from '../errors/HikeError';

export const useGetHealth = (queryOptions?: UseQueryOptions<{ status: string; version: string }, HikeError<null>>) =>
  useQuery({
    queryKey: ['health'],
    queryFn: async () => await healthCheck(),
    ...queryOptions
  });
