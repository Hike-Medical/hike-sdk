import { EvaluationExtended, StartEvaluationInsoleParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { startInsoleEvaluation } from '../api/evaluation.service';

export const useStartInsoleEvaluation = (
  mutationOptions?: UseMutationOptions<EvaluationExtended, Error, StartEvaluationInsoleParams>
) => {
  return useMutation({
    mutationKey: ['createInsoleEvalaution'],
    mutationFn: async (body: StartEvaluationInsoleParams) => await startInsoleEvaluation(body),
    ...mutationOptions
  });
};
