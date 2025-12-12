import { getMachines } from '@hike/services';
import { GetMachinesParams, HikeError, Machine } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseMachinesOptions extends Omit<UseQueryOptions<Machine[], HikeError<null>>, 'queryFn' | 'queryKey'> {
  params: GetMachinesParams;
  queryKey?: QueryKey;
}

export const useMachines = ({ params, queryKey = [], ...options }: UseMachinesOptions) =>
  useQuery<Machine[], HikeError<null>>({
    queryKey: ['machines', params, queryKey],
    queryFn: async () => await getMachines(params),
    ...options
  });

