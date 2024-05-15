import { CreateEvaluationParams, EvaluationExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { createInsoleEvaluation } from '../api/evaluation.service';

export const useCreateInsoleEvaluation = (
  mutationOptions?: UseMutationOptions<EvaluationExtended, Error, CreateEvaluationParams>
) => {
  return useMutation({
    mutationKey: ['createInsoleEvalaution'],
    mutationFn: async (body: CreateEvaluationParams) => await createInsoleEvaluation(body),
    ...mutationOptions
  });
};
