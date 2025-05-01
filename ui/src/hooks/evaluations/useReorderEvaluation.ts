import { HikeError, reorderEvaluation } from '@hike/services';
import { ActionEvaluationParams, EvaluationExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useReorderEvaluation = (
  mutationOptions?: UseMutationOptions<EvaluationExtended, HikeError<null>, ActionEvaluationParams>
) =>
  useMutation({
    mutationKey: ['reorderEvaluation'],
    mutationFn: async (body) => await reorderEvaluation(body),
    ...mutationOptions
  });
