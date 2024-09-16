import { ActionEvaluationParams, EvaluationExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { reorderEvaluation } from '../../api/evaluation.service';
import { HikeError } from '../../errors/HikeError';

export const useReorderEvaluation = (
  mutationOptions?: UseMutationOptions<EvaluationExtended, HikeError<null>, ActionEvaluationParams>
) => {
  return useMutation({
    mutationKey: ['reorderEvaluation'],
    mutationFn: async (body: ActionEvaluationParams) => await reorderEvaluation(body),
    ...mutationOptions
  });
};
