import { EvaluationExtended, StartEvaluationProductParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { startProductEvaluation } from '../api/evaluation.service';

export const useStartProductEvaluation = (
  mutationOptions?: UseMutationOptions<EvaluationExtended, Error, StartEvaluationProductParams>
) => {
  return useMutation({
    mutationKey: ['createInsoleEvalaution'],
    mutationFn: async (body: StartEvaluationProductParams) => await startProductEvaluation(body),
    ...mutationOptions
  });
};
