import { DuplicateEvaluationParams, EvaluationExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { duplicateEvaluation } from '../../api/evaluation.service';
import { HikeError } from '../../errors/HikeError';

interface DuplicateEvaluationContext {
  evaluationId: string;
  params: DuplicateEvaluationParams;
}

export const useDuplicateEvaluation = (
  mutationOptions?: UseMutationOptions<EvaluationExtended, HikeError<null>, DuplicateEvaluationContext>
) => {
  return useMutation({
    mutationKey: ['duplicateEvaluation'],
    mutationFn: async (body: DuplicateEvaluationContext) => await duplicateEvaluation(body.evaluationId, body.params),
    ...mutationOptions
  });
};
