import { HikeError, globalSearch } from '@hike/services';
import type { GetSearchParams, SearchResponse } from '@hike/types';
import { useQuery } from '@tanstack/react-query';

interface UseGlobalSearchOptions extends GetSearchParams {
  key?: string[];
  enabled?: boolean;
}

export const useGlobalSearch = ({ key = [], enabled = true, ...params }: UseGlobalSearchOptions) =>
  useQuery<SearchResponse, HikeError<null>>({
    queryKey: ['useGlobalSearch', ...key, params],
    queryFn: async () => await globalSearch(params),
    enabled
  });
