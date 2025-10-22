import { fetchOrthofeetFilters } from '@hike/services';
import type { GetOrthofeetFiltersParams, OrthofeetFiltersResponse } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseOrthofeetFiltersOptions
  extends Omit<UseQueryOptions<OrthofeetFiltersResponse, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params: GetOrthofeetFiltersParams;
  queryKey?: QueryKey;
}

export const useOrthofeetFilters = ({ params, queryKey = [], ...options }: UseOrthofeetFiltersOptions) =>
  useQuery({
    queryKey: ['orthofeet-filters', params.supplierId, queryKey],
    queryFn: async () => await fetchOrthofeetFilters(params),
    staleTime: Infinity, // Filters don't change often
    ...options
  });
