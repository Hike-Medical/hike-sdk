import { HikeError, editEvaluation } from '@hike/services';
import { ActionEvaluationParams, EvaluationExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useEditEvaluation = (
  mutationOptions?: UseMutationOptions<EvaluationExtended, HikeError<null>, ActionEvaluationParams>
) =>
  useMutation({
    mutationKey: ['editEvaluation'],
    mutationFn: async (body) => await editEvaluation(body),
    ...mutationOptions
  });
