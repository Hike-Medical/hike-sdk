import { statsForEvaluations } from '@hike/services';
import type { EvaluationsStats } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseEvaluationStatsOptions
  extends Omit<UseQueryOptions<EvaluationsStats, HikeError<null>>, 'queryKey' | 'queryFn'> {
  assignedOnly?: boolean;
  queryKey?: QueryKey;
}

export const useEvaluationStats = ({ assignedOnly, queryKey = [], ...options }: UseEvaluationStatsOptions = {}) =>
  useQuery({
    queryKey: ['evaluationStats', assignedOnly, queryKey],
    queryFn: async () => await statsForEvaluations(assignedOnly),
    ...options
  });
