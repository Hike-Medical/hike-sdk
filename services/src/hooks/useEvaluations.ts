import type { EvaluationExtended, GetEvaluationsByStatusParams, PagedResponse } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { findEvaluationsByStatus } from '../api/evaluation.service';
import { ResponseError } from '../errors/ResponseError';

export interface UseEvaluationsOptions extends GetEvaluationsByStatusParams {
  key?: string[];
  enabled?: boolean;
}

export const useEvaluations = ({ key = [], enabled = true, ...params }: UseEvaluationsOptions) =>
  useQuery<PagedResponse<EvaluationExtended[]>, ResponseError<null>>({
    queryKey: ['evaluations', ...key, params],
    queryFn: async () => {
      try {
        return await findEvaluationsByStatus(params);
      } catch (error) {
        const status = isAxiosError(error) ? error.status ?? 500 : 500;
        // TODO: Extract message from backend response
        throw new ResponseError<null>('There was an error retrieving evaluations', status, null);
      }
    },
    enabled
  });
