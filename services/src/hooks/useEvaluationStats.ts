import type { EvaluationsStats } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { statsForEvaluations } from '../api/evaluation.service';
import { ResponseError } from '../errors/ResponseError';

export interface UseEvaluationStatsOptions {
  key?: string[];
  userId?: string;
  enabled?: boolean;
}

export const useEvaluationStats = ({ key = [], enabled = true, ...params }: UseEvaluationStatsOptions) =>
  useQuery<EvaluationsStats, ResponseError<null>>({
    queryKey: ['evaluationStats', ...key, params],
    queryFn: async () => await statsForEvaluations(params.userId),
    enabled
  });
