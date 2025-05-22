import { remakeEvaluation } from '@hike/services';
import { ActionEvaluationParams, EvaluationExtended, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useRemakeEvaluation = (
  options?: UseMutationOptions<EvaluationExtended, HikeError<null>, ActionEvaluationParams>
) =>
  useMutation({
    mutationKey: ['remakeEvaluation'],
    mutationFn: async (body) => await remakeEvaluation(body),
    ...options
  });
