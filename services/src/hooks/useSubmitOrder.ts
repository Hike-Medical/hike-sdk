import { SubmitOrderBody, Workbench } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { submitOrder } from 'api/workbench.service';

interface SubmitOrderParams {
  workbenchId: string;
  body: SubmitOrderBody;
}

export const useSubmitOrder = (options?: UseMutationOptions<Workbench, Error, SubmitOrderParams>) => {
  return useMutation({
    mutationKey: ['submitOrder'],
    mutationFn: async ({ workbenchId, body }: SubmitOrderParams) => await submitOrder(workbenchId, body),
    ...options
  });
};
