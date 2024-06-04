import { ActionEvaluationParams, EvaluationExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { cancelEvaluation } from '../api/evaluation.service';

export const useCancelEvaluation = (
  mutationOptions?: UseMutationOptions<EvaluationExtended, Error, ActionEvaluationParams>
) => {
  return useMutation({
    mutationKey: ['cancelEvalaution'],
    mutationFn: async (body: ActionEvaluationParams) => await cancelEvaluation(body),
    ...mutationOptions
  });
};
