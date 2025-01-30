import { ActionEvaluationParams, EvaluationExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { adjustmentEvaluation } from '../../api/evaluation.service';
import { HikeError } from '../../errors/HikeError';

export const useAdjustEvaluation = (
  mutationOptions?: UseMutationOptions<EvaluationExtended, HikeError<null>, ActionEvaluationParams>
) => {
  return useMutation({
    mutationKey: ['adjustEvaluation'],
    mutationFn: async (body: ActionEvaluationParams) => await adjustmentEvaluation(body),
    ...mutationOptions
  });
};
