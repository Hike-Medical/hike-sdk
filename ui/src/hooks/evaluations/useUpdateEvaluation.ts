import { updateEvaluation } from '@hike/services';
import { EvaluationExtended, HikeError, UpdateEvaluationParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface UseUpdateEvaluationParams {
  evaluationId: string;
  params: UpdateEvaluationParams;
}

export const useUpdateEvaluation = (
  options?: UseMutationOptions<EvaluationExtended, HikeError<null>, UseUpdateEvaluationParams>
) =>
  useMutation({
    mutationKey: ['updateEvaluation'],
    mutationFn: async ({ evaluationId, params }) => await updateEvaluation(evaluationId, params),
    ...options
  });
