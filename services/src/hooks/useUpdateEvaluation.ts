import { EvaluationExtended, UpdateEvaluationParams } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { updateEvaluation } from '../api/evaluation.service';

interface UseUpdateEvaluationParams {
  evaluationId: string;
  params: UpdateEvaluationParams;
}

export const useUpdateEvaluation = (
  mutationOptions?: UseMutationOptions<EvaluationExtended, Error, UseUpdateEvaluationParams>
) => {
  return useMutation({
    mutationKey: ['updateEvaluation'],
    mutationFn: async ({ evaluationId, params }: UseUpdateEvaluationParams) =>
      await updateEvaluation(evaluationId, params),
    ...mutationOptions
  });
};