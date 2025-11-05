import { fetchDepartments } from '@hike/services';
import { DepartmentExtended, GetDepartmentsParams, HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface DepartmentsRequest
  extends Omit<UseQueryOptions<DepartmentExtended[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  params?: GetDepartmentsParams;
  queryKey?: QueryKey;
}

export const useDepartments = ({ queryKey = [], params, ...options }: DepartmentsRequest = {}) =>
  useQuery({
    queryKey: ['departments', params, queryKey],
    queryFn: async () => await fetchDepartments(params),
    ...options
  });
