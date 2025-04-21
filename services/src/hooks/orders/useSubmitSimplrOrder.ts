import { Workbench } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { submitSimplrOrder } from '../../api/workbench.service';
import { HikeError } from '../../errors/HikeError';

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
