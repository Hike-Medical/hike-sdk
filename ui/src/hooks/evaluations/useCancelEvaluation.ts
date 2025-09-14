import { cancelEvaluation } from '@hike/services';
import { EvaluationExtended, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useCancelEvaluation = (
  options?: UseMutationOptions<EvaluationExtended, HikeError<null>, { evaluationId: string; companyIds?: string[] }>
) =>
  useMutation({
    mutationKey: ['cancelEvalaution'],
    mutationFn: async ({ evaluationId, companyIds }) => await cancelEvaluation(evaluationId, companyIds),
    ...options
  });
