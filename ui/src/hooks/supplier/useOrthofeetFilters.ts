import { fetchOrthofeetFilters } from '@hike/services';
import type { GetOrthofeetFiltersParams, OrthofeetFiltersResponse } from '@hike/types';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export const useOrthofeetFilters = (
  options: Omit<UseQueryOptions<OrthofeetFiltersResponse>, 'queryKey' | 'queryFn'> & {
    params: GetOrthofeetFiltersParams;
  }
) => {
  return useQuery({
    queryKey: ['orthofeet-filters', options.params.supplierId],
    queryFn: () => fetchOrthofeetFilters(options.params),
    enabled: !!options.params.supplierId,
    staleTime: Infinity, // Filters don't change often
    ...options
  });
};
