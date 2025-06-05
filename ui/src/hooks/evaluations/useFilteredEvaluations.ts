import { findFilteredEvaluations } from '@hike/services';
import { EvaluationExtended, GetFilteredEvaluationsParams, HikeError, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseFilteredEvaluationsOptions
  extends Omit<UseQueryOptions<PagedResponse<EvaluationExtended[]>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params: GetFilteredEvaluationsParams;
  queryKey?: QueryKey;
}

export const useFilteredEvaluations = ({ params, queryKey = [], ...options }: UseFilteredEvaluationsOptions) =>
  useQuery({
    queryKey: ['filteredEvaluations', params, queryKey],
    queryFn: async () => await findFilteredEvaluations(params),
    ...options
  });
