import { cancelEvaluation } from '@hike/services';
import { ActionEvaluationParams, EvaluationExtended, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useCancelEvaluation = (
  mutationOptions?: UseMutationOptions<EvaluationExtended, HikeError<null>, ActionEvaluationParams>
) =>
  useMutation({
    mutationKey: ['cancelEvalaution'],
    mutationFn: async (body) => await cancelEvaluation(body),
    ...mutationOptions
  });
