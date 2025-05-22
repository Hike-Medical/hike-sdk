import { adjustmentEvaluation } from '@hike/services';
import { ActionEvaluationParams, EvaluationExtended, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useAdjustEvaluation = (
  mutationOptions?: UseMutationOptions<EvaluationExtended, HikeError<null>, ActionEvaluationParams>
) =>
  useMutation({
    mutationKey: ['adjustEvaluation'],
    mutationFn: async (body) => await adjustmentEvaluation(body),
    ...mutationOptions
  });
