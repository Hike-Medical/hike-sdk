import { HikeError, startEvaluationByProduct } from '@hike/services';
import { EvaluationExtended, StartEvaluationByProductParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useStartEvaluationByProduct = (
  mutationOptions?: UseMutationOptions<EvaluationExtended, HikeError<null>, StartEvaluationByProductParams>
) =>
  useMutation({
    mutationKey: ['startEvaluationByProduct'],
    mutationFn: async (body) => await startEvaluationByProduct(body),
    ...mutationOptions
  });
