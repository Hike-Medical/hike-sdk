import { findCompanies } from '@hike/services';
import type { Company, FindCompaniesParams, PagedResponse } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseCompaniesOptions
  extends Omit<UseQueryOptions<PagedResponse<Company[]>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params?: FindCompaniesParams;
  queryKey?: QueryKey;
}

export const useCompanies = ({ params, queryKey = [], ...options }: UseCompaniesOptions = {}) =>
  useQuery({
    queryKey: ['companies', params, queryKey],
    queryFn: async () => await findCompanies(params),
    ...options
  });
