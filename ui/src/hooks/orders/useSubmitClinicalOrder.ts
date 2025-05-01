import { HikeError, submitClinicalOrder } from '@hike/services';
import { SubmitOrderParams, Workbench } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface SubmitClinicalOrderContext {
  workbenchId: string;
  body: SubmitOrderParams;
}

export const useSubmitClinicalOrder = (
  options?: UseMutationOptions<Workbench, HikeError<null>, SubmitClinicalOrderContext>
) =>
  useMutation({
    mutationKey: ['submitClinicalOrder'],
    mutationFn: async ({ workbenchId, body }) => await submitClinicalOrder(workbenchId, body),
    ...options
  });
