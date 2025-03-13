import type { GetSearchParams, SearchResponse } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { searchEvaluations } from '../api/search.service';
import { HikeError } from '../errors/HikeError';

interface UseGlobalSearchOptions extends GetSearchParams {
  key?: string[];
  enabled?: boolean;
}

export const useGlobalSearch = ({ key = [], enabled = true, ...params }: UseGlobalSearchOptions) =>
  useQuery<SearchResponse, HikeError<null>>({
    queryKey: ['useGlobalSearch', ...key, params],
    queryFn: async () => await searchEvaluations(params),
    enabled
  });
