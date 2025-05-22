import { startEvaluationByProduct } from '@hike/services';
import { EvaluationExtended, HikeError, StartEvaluationByProductParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useStartEvaluationByProduct = (
  options?: UseMutationOptions<EvaluationExtended, HikeError<null>, StartEvaluationByProductParams>
) =>
  useMutation({
    mutationKey: ['startEvaluationByProduct'],
    mutationFn: async (body) => await startEvaluationByProduct(body),
    ...options
  });
