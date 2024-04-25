import type { EvaluationExtended, PagedResponse, SearchEvaluationsParams } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { searchEvaluations } from '../api/evaluation.service';
import { ResponseError } from '../errors/ResponseError';

export interface UseEvaluationsOptions extends SearchEvaluationsParams {
  key?: string[];
  enabled?: boolean;
}

export const useEvaluations = ({ key = [], enabled = true, ...params }: UseEvaluationsOptions) =>
  useQuery<PagedResponse<EvaluationExtended[]>, ResponseError<null>>({
    queryKey: ['evaluations', ...key, params],
    queryFn: async () => {
      try {
        return await searchEvaluations(params);
      } catch (error) {
        const status = isAxiosError(error) ? error.status ?? 500 : 500;
        // TODO: Extract message from backend response
        throw new ResponseError<null>('There was an error retrieving evaluations', status, null);
      }
    },
    enabled
  });
