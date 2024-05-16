import { CreateEvaluationInsoleParams, EvaluationExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { createInsoleEvaluation } from '../api/evaluation.service';

export const useCreateInsoleEvaluation = (
  mutationOptions?: UseMutationOptions<EvaluationExtended, Error, CreateEvaluationInsoleParams>
) => {
  return useMutation({
    mutationKey: ['createInsoleEvalaution'],
    mutationFn: async (body: CreateEvaluationInsoleParams) => await createInsoleEvaluation(body),
    ...mutationOptions
  });
};
