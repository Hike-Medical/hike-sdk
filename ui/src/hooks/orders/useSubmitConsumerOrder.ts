import { submitConsumerOrder } from '@hike/services';
import { HikeError, Workbench } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface SubmitConsumerOrderContext {
  workbenchId: string;
}

export const useSubmitConsumerOrder = (
  options?: UseMutationOptions<Workbench, HikeError<null>, SubmitConsumerOrderContext>
) =>
  useMutation({
    mutationKey: ['submitConsumerOrder'],
    mutationFn: async ({ workbenchId }) => await submitConsumerOrder(workbenchId),
    ...options
  });
