import { CreateEvaluationByProductParams, EvaluationExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { createEvaluationByProduct } from '../../api/evaluation.service';
import { ResponseError } from '../../errors/ResponseError';

export const useCreateEvaluationByProduct = (
  mutationOptions?: UseMutationOptions<EvaluationExtended, ResponseError<null>, CreateEvaluationByProductParams>
) => {
  return useMutation({
    mutationKey: ['createEvaluationByProduct'],
    mutationFn: async (body: CreateEvaluationByProductParams) => await createEvaluationByProduct(body),
    ...mutationOptions
  });
};
