import { Workbench } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { submitConsumerOrder } from '../../api/workbench.service';
import { HikeError } from '../../errors/HikeError';

interface SubmitConsumerOrderContext {
  workbenchId: string;
}

export const useSubmitConsumerOrder = (
  options?: UseMutationOptions<Workbench, HikeError<null>, SubmitConsumerOrderContext>
) => {
  return useMutation({
    mutationKey: ['submitConsumerOrder'],
    mutationFn: async ({ workbenchId }: SubmitConsumerOrderContext) => await submitConsumerOrder(workbenchId),
    ...options
  });
};
