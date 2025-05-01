import { HikeError, searchEvaluations } from '@hike/services';
import type { EvaluationExtended, PagedResponse, SearchEvaluationsParams } from '@hike/types';
import { useQuery } from '@tanstack/react-query';

interface UseEvaluationsSearchOptions extends SearchEvaluationsParams {
  key?: string[];
  enabled?: boolean;
}

export const useEvaluationSearch = ({ key = [], enabled = true, ...params }: UseEvaluationsSearchOptions) =>
  useQuery<PagedResponse<EvaluationExtended[]>, HikeError<null>>({
    queryKey: ['evaluationSearch', ...key, params],
    queryFn: async () => await searchEvaluations(params),
    enabled
  });
