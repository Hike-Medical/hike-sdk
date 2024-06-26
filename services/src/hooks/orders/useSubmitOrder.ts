import { SubmitOrderParams, Workbench } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { submitOrder } from '../../api/workbench.service';

interface SubmitOrderContext {
  workbenchId: string;
  body: SubmitOrderParams;
}

export const useSubmitOrder = (options?: UseMutationOptions<Workbench, Error, SubmitOrderContext>) => {
  return useMutation({
    mutationKey: ['submitOrder'],
    mutationFn: async ({ workbenchId, body }: SubmitOrderContext) => await submitOrder(workbenchId, body),
    ...options
  });
};
