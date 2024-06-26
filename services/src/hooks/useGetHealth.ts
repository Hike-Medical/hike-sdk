import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { healthCheck } from '../api/health.service';
import { ResponseError } from '../errors/ResponseError';

export const useGetHealth = (
  queryOptions?: UseQueryOptions<{ status: string; version: string }, ResponseError<null>>
) => {
  return useQuery({
    queryKey: ['health'],
    queryFn: async () => await healthCheck(),
    ...queryOptions
  });
};
