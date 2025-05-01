import { HikeError, remakeEvaluation } from '@hike/services';
import { ActionEvaluationParams, EvaluationExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useRemakeEvaluation = (
  mutationOptions?: UseMutationOptions<EvaluationExtended, HikeError<null>, ActionEvaluationParams>
) =>
  useMutation({
    mutationKey: ['remakeEvaluation'],
    mutationFn: async (body) => await remakeEvaluation(body),
    ...mutationOptions
  });
