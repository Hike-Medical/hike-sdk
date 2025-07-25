import { submitSimplrOrder } from '@hike/services';
import { HikeError, Workbench } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface SubmitSimplrOrderContext {
  workbenchId: string;
}

export const useSubmitSimplrOrder = (
  options?: UseMutationOptions<Workbench, HikeError<null>, SubmitSimplrOrderContext>
) =>
  useMutation({
    mutationKey: ['submitSimplrOrder'],
    mutationFn: async ({ workbenchId }) => await submitSimplrOrder(workbenchId),
    ...options
  });
