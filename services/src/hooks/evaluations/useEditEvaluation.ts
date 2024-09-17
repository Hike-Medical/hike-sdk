import { ActionEvaluationParams, EvaluationExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { editEvaluation } from '../../api/evaluation.service';
import { HikeError } from '../../errors/HikeError';

export const useEditEvaluation = (
  mutationOptions?: UseMutationOptions<EvaluationExtended, HikeError<null>, ActionEvaluationParams>
) => {
  return useMutation({
    mutationKey: ['editEvaluation'],
    mutationFn: async (body: ActionEvaluationParams) => await editEvaluation(body),
    ...mutationOptions
  });
};
