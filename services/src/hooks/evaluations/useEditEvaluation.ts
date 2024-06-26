import { ActionEvaluationParams, EvaluationExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { editEvaluation } from '../../api/evaluation.service';

export const useEditEvaluation = (
  mutationOptions?: UseMutationOptions<EvaluationExtended, Error, ActionEvaluationParams>
) => {
  return useMutation({
    mutationKey: ['editEvaluation'],
    mutationFn: async (body: ActionEvaluationParams) => await editEvaluation(body),
    ...mutationOptions
  });
};
