import { ActionEvaluationParams, EvaluationExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { remakeEvaluation } from '../../api/evaluation.service';
import { ResponseError } from '../../errors/ResponseError';

export const useRemakeEvaluation = (
  mutationOptions?: UseMutationOptions<EvaluationExtended, ResponseError<null>, ActionEvaluationParams>
) => {
  return useMutation({
    mutationKey: ['remakeEvaluation'],
    mutationFn: async (body: ActionEvaluationParams) => await remakeEvaluation(body),
    ...mutationOptions
  });
};
