import { SubmitOrderParams, Workbench } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { submitOrder } from '../../api/workbench.service';
import { HikeError } from '../../errors/HikeError';

interface SubmitOrderContext {
  workbenchId: string;
  body: SubmitOrderParams;
}

export const useSubmitOrder = (options?: UseMutationOptions<Workbench, HikeError<null>, SubmitOrderContext>) => {
  return useMutation({
    mutationKey: ['submitWorkbenchOrder'],
    mutationFn: async ({ workbenchId, body }: SubmitOrderContext) => await submitOrder(workbenchId, body),
    ...options
  });
};
