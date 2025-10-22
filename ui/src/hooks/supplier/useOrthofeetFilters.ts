import { fetchOrthofeetFilters } from '@hike/services';
import type { OrthofeetFiltersResponse } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseOrthofeetFiltersOptions
  extends Omit<UseQueryOptions<OrthofeetFiltersResponse, HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useOrthofeetFilters = ({ queryKey = [], ...options }: UseOrthofeetFiltersOptions = {}) =>
  useQuery({
    queryKey: ['orthofeetFilters', queryKey],
    queryFn: async () => await fetchOrthofeetFilters(),
    staleTime: Infinity, // Filters don't change often
    ...options
  });
