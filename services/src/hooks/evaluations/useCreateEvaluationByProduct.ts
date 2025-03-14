import { CreateEvaluationByProductParams, EvaluationExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { createEvaluationByProduct } from '../../api/evaluation.service';
import { HikeError } from '../../errors/HikeError';

export const useCreateEvaluationByProduct = (
  mutationOptions?: UseMutationOptions<EvaluationExtended, HikeError<null>, CreateEvaluationByProductParams>
) =>
  useMutation({
    mutationKey: ['createEvaluationByProduct'],
    mutationFn: async (body) => await createEvaluationByProduct(body),
    ...mutationOptions
  });
