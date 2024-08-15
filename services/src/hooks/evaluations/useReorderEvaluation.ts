import { ActionEvaluationParams, EvaluationExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { reorderEvaluation } from '../../api/evaluation.service';
import { ResponseError } from '../../errors/ResponseError';

export const useReorderEvaluation = (
  mutationOptions?: UseMutationOptions<EvaluationExtended, ResponseError<null>, ActionEvaluationParams>
) => {
  return useMutation({
    mutationKey: ['reorderEvaluation'],
    mutationFn: async (body: ActionEvaluationParams) => await reorderEvaluation(body),
    ...mutationOptions
  });
};
