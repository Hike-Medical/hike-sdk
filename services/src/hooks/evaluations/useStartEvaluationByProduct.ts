import { EvaluationExtended, StartEvaluationByProductParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { startEvaluationByProduct } from '../../api/evaluation.service';
import { HikeError } from '../../errors/HikeError';

export const useStartEvaluationByProduct = (
  mutationOptions?: UseMutationOptions<EvaluationExtended, HikeError<null>, StartEvaluationByProductParams>
) =>
  useMutation({
    mutationKey: ['startEvaluationByProduct'],
    mutationFn: async (body) => await startEvaluationByProduct(body),
    ...mutationOptions
  });
