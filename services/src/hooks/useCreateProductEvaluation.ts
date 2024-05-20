import { CreateEvaluationProductParams, EvaluationExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { createProductEvaluation } from '../api/evaluation.service';

export const useCreateProductEvaluation = (
  mutationOptions?: UseMutationOptions<EvaluationExtended, Error, CreateEvaluationProductParams>
) => {
  return useMutation({
    mutationKey: ['createInsoleEvalaution'],
    mutationFn: async (body: CreateEvaluationProductParams) => await createProductEvaluation(body),
    ...mutationOptions
  });
};
