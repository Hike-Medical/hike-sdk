import { EvaluationExtended, UpdateEvaluationParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { updateEvaluation } from '../../api/evaluation.service';
import { HikeError } from '../../errors/HikeError';

interface UseUpdateEvaluationParams {
  evaluationId: string;
  params: UpdateEvaluationParams;
}

export const useUpdateEvaluation = (
  mutationOptions?: UseMutationOptions<EvaluationExtended, HikeError<null>, UseUpdateEvaluationParams>
) =>
  useMutation({
    mutationKey: ['updateEvaluation'],
    mutationFn: async ({ evaluationId, params }) => await updateEvaluation(evaluationId, params),
    ...mutationOptions
  });
