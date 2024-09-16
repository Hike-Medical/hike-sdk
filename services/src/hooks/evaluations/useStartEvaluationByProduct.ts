import { EvaluationExtended, StartEvaluationByProductParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { startEvaluationByProduct } from '../../api/evaluation.service';
import { HikeError } from '../../errors/HikeError';

export const useStartEvaluationByProduct = (
  mutationOptions?: UseMutationOptions<EvaluationExtended, HikeError<null>, StartEvaluationByProductParams>
) => {
  return useMutation({
    mutationKey: ['startEvaluationByProduct'],
    mutationFn: async (body: StartEvaluationByProductParams) => await startEvaluationByProduct(body),
    ...mutationOptions
  });
};
