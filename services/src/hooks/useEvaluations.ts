import type { EvaluationExtended, GetEvaluationsByStatusParams, PagedResponse } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { findEvaluationsByStatus } from '../api/evaluation.service';
import { ResponseError } from '../errors/ResponseError';

export interface UseEvaluationsOptions extends GetEvaluationsByStatusParams {
  key?: string[];
  enabled?: boolean;
}

export const useEvaluations = ({ key = [], enabled = true, ...params }: UseEvaluationsOptions) =>
  useQuery<PagedResponse<EvaluationExtended[]>, ResponseError<null>>({
    queryKey: ['evaluations', ...key, params],
    queryFn: async () => await findEvaluationsByStatus(params),
    enabled
  });
