import { duplicateEvaluation } from '@hike/services';
import { ActionEvaluationParams, EvaluationExtended, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useDuplicateEvaluation = (
  options?: UseMutationOptions<EvaluationExtended, HikeError<null>, ActionEvaluationParams>
) =>
  useMutation({
    mutationKey: ['duplicateEvaluation'],
    mutationFn: async (body) => await duplicateEvaluation(body),
    ...options
  });
