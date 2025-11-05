import { fetchDepartments } from '@hike/services';
import { Department, HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseDepartmentsOptions extends Omit<UseQueryOptions<Department[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useDepartments = ({ queryKey = [], ...options }: UseDepartmentsOptions = {}) =>
  useQuery({
    queryKey: ['departments', queryKey],
    queryFn: async () => await fetchDepartments(),
    ...options
  });
