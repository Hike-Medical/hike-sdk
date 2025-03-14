import type { EvaluationExtended, GetEvaluationsParams, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { findEvaluations } from '../../api/evaluation.service';
import { HikeError } from '../../errors/HikeError';

interface UseEvaluationsOptions
  extends Omit<UseQueryOptions<PagedResponse<EvaluationExtended[]>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params: GetEvaluationsParams;
  queryKey?: QueryKey;
}

export const useEvaluations = ({ params, queryKey = [], ...options }: UseEvaluationsOptions) =>
  useQuery({
    queryKey: ['evaluations', params, queryKey],
    queryFn: async () => await findEvaluations(params),
    ...options
  });
