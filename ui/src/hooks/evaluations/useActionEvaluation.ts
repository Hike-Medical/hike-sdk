import { actionEvaluation } from '@hike/services';
import { ActionEvaluationParams, EvaluationExtended, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useActionEvaluation = (
  options?: UseMutationOptions<
    EvaluationExtended,
    HikeError<null>,
    { evaluationId: string; body: ActionEvaluationParams; companyIds?: string[] }
  >
) =>
  useMutation({
    mutationKey: ['actionEvaluation'],
    mutationFn: async ({ evaluationId, body, companyIds }) => await actionEvaluation(evaluationId, body, companyIds),
    ...options
  });
