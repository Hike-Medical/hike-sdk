import { ActionEvaluationParams, EvaluationExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { cancelEvaluation } from '../../api/evaluation.service';
import { HikeError } from '../../errors/HikeError';

export const useCancelEvaluation = (
  mutationOptions?: UseMutationOptions<EvaluationExtended, HikeError<null>, ActionEvaluationParams>
) =>
  useMutation({
    mutationKey: ['cancelEvalaution'],
    mutationFn: async (body) => await cancelEvaluation(body),
    ...mutationOptions
  });
