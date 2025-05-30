import { createEvaluationByProduct } from '@hike/services';
import { CreateEvaluationByProductParams, EvaluationExtended, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useCreateEvaluationByProduct = (
  options?: UseMutationOptions<EvaluationExtended, HikeError<null>, CreateEvaluationByProductParams>
) =>
  useMutation({
    mutationKey: ['createEvaluationByProduct'],
    mutationFn: async (body) => await createEvaluationByProduct(body),
    ...options
  });
