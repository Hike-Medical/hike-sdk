import { searchEvaluations } from '@hike/services';
import type { EvaluationExtended, PagedResponse, SearchEvaluationsParams } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseEvaluationsSearchOptions
  extends Omit<UseQueryOptions<PagedResponse<EvaluationExtended[]>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params: SearchEvaluationsParams;
  queryKey?: QueryKey;
}

export const useEvaluationSearch = ({ params, queryKey = [], ...options }: UseEvaluationsSearchOptions) =>
  useQuery({
    queryKey: ['evaluationSearch', params, queryKey],
    queryFn: async () => await searchEvaluations(params),
    ...options
  });
