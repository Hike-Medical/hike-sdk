import { fetchAnodyneFilters } from '@hike/services';
import type { AnodyneFiltersResponse } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseAnodyneFiltersOptions
  extends Omit<UseQueryOptions<AnodyneFiltersResponse, HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useAnodyneFilters = ({ queryKey = [], ...options }: UseAnodyneFiltersOptions = {}) =>
  useQuery({
    queryKey: ['anodyneFilters', queryKey],
    queryFn: async () => await fetchAnodyneFilters(),
    staleTime: Infinity,
    ...options
  });
