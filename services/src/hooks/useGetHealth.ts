import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { healthCheck } from '../api/health.service';

export const useGetHealth = (queryOptions?: UseQueryOptions<{ status: string; version: string }, Error>) => {
  return useQuery({
    queryKey: ['health'],
    queryFn: async () => await healthCheck(),
    ...queryOptions
  });
};
