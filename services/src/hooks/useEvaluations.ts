import type { EvaluationExtended, GetEvaluationsParams, PagedResponse } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { findEvaluations } from '../api/evaluation.service';
import { ResponseError } from '../errors/ResponseError';

export interface UseEvaluationsOptions extends GetEvaluationsParams {
  key?: string[];
  enabled?: boolean;
}

export const useEvaluations = ({ key = [], enabled = true, ...params }: UseEvaluationsOptions) =>
  useQuery<PagedResponse<EvaluationExtended[]>, ResponseError<null>>({
    queryKey: ['evaluations', ...key, params],
    queryFn: async () => await findEvaluations(params),
    enabled
  });
