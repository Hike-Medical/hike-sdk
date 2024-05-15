import type { EvaluationExtended, EvaluationsStats, GetEvaluationsByStatusParams, PagedResponse } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { findEvaluationsByStatus, statsForEvaluations } from '../api/evaluation.service';
import { ResponseError } from '../errors/ResponseError';

export interface UseEvaluationsOptions extends GetEvaluationsByStatusParams {
  key?: string[];
  enabled?: boolean;
}

export interface UseEvaluationCountOptions {
  key?: string[];
  enabled?: boolean;
  clinicianId?: string;
}

export const useEvaluations = ({ key = [], enabled = true, ...params }: UseEvaluationsOptions) =>
  useQuery<PagedResponse<EvaluationExtended[]>, ResponseError<null>>({
    queryKey: ['evaluations', ...key, params],
    queryFn: async () => await findEvaluationsByStatus(params),
    enabled
  });

export const useEvaluationStatusCount = ({ key = [], enabled = true, ...params }: UseEvaluationCountOptions) =>
  useQuery<EvaluationsStats, ResponseError<null>>({
    queryKey: ['evaluationCount', ...key, params],
    queryFn: async () => await statsForEvaluations(params.clinicianId),
    enabled
  });
