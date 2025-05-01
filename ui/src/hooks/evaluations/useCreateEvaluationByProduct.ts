import { HikeError, createEvaluationByProduct } from '@hike/services';
import { CreateEvaluationByProductParams, EvaluationExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useCreateEvaluationByProduct = (
  mutationOptions?: UseMutationOptions<EvaluationExtended, HikeError<null>, CreateEvaluationByProductParams>
) =>
  useMutation({
    mutationKey: ['createEvaluationByProduct'],
    mutationFn: async (body) => await createEvaluationByProduct(body),
    ...mutationOptions
  });
