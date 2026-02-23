import { submitConsumerOrder } from '@hike/services';
import { FormFieldValue, HikeError, Workbench } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface SubmitConsumerOrderContext {
  workbenchId: string;
  couponCode?: string;
  orderFormData?: Record<string, FormFieldValue>;
}

export const useSubmitConsumerOrder = (
  options?: UseMutationOptions<Workbench, HikeError<null>, SubmitConsumerOrderContext>
) =>
  useMutation({
    mutationKey: ['submitConsumerOrder'],
    mutationFn: async ({ workbenchId, couponCode, orderFormData }) =>
      await submitConsumerOrder(workbenchId, couponCode, orderFormData),
    ...options
  });
