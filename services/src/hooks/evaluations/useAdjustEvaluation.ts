import { ActionEvaluationParams, EvaluationExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { adjustmentEvaluation } from '../../api/evaluation.service';
import { HikeError } from '../../errors/HikeError';

interface AdjustEvaluationContext {
  params: ActionEvaluationParams;
  companyIds?: string[];
}

export const useAdjustEvaluation = (
  mutationOptions?: UseMutationOptions<EvaluationExtended, HikeError<null>, AdjustEvaluationContext>
) =>
  useMutation({
    mutationKey: ['adjustEvaluation'],
    mutationFn: async ({ params, companyIds }) => await adjustmentEvaluation(params, companyIds),
    ...mutationOptions
  });
