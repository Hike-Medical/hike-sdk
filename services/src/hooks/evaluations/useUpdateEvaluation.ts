import { EvaluationExtended, UpdateEvaluationParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { updateEvaluation } from '../../api/evaluation.service';
import { ResponseError } from '../../errors/ResponseError';

interface UseUpdateEvaluationParams {
  evaluationId: string;
  params: UpdateEvaluationParams;
}

export const useUpdateEvaluation = (
  mutationOptions?: UseMutationOptions<EvaluationExtended, ResponseError<null>, UseUpdateEvaluationParams>
) => {
  return useMutation({
    mutationKey: ['updateEvaluation'],
    mutationFn: async ({ evaluationId, params }: UseUpdateEvaluationParams) =>
      await updateEvaluation(evaluationId, params),
    ...mutationOptions
  });
};
