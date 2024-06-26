import { ActionEvaluationParams, EvaluationExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { editEvaluation } from '../../api/evaluation.service';
import { ResponseError } from '../../errors/ResponseError';

export const useEditEvaluation = (
  mutationOptions?: UseMutationOptions<EvaluationExtended, ResponseError<null>, ActionEvaluationParams>
) => {
  return useMutation({
    mutationKey: ['editEvaluation'],
    mutationFn: async (body: ActionEvaluationParams) => await editEvaluation(body),
    ...mutationOptions
  });
};
