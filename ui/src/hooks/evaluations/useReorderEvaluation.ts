import { reorderEvaluation } from '@hike/services';
import { ActionEvaluationParams, EvaluationExtended, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useReorderEvaluation = (
  options?: UseMutationOptions<EvaluationExtended, HikeError<null>, ActionEvaluationParams>
) =>
  useMutation({
    mutationKey: ['reorderEvaluation'],
    mutationFn: async (body) => await reorderEvaluation(body),
    ...options
  });
