import { submitDelivery } from '@hike/services';
import { HikeError, SubmitDeliveryParams, Workbench } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface SubmitDeliveryContext {
  workbenchId: string;
  params: SubmitDeliveryParams;
}

export const useSubmitDelivery = (options?: UseMutationOptions<Workbench, HikeError<null>, SubmitDeliveryContext>) =>
  useMutation({
    mutationKey: ['submitDelivery'],
    mutationFn: async ({ workbenchId, params }) => await submitDelivery(workbenchId, params),
    ...options
  });
