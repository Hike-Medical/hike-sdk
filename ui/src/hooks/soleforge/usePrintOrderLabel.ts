import { printOrderLabel } from '@hike/services';
import { HikeError, PrintOrderLabelParams, PrintOrderLabelResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface PrintOrderLabelMutationParams extends PrintOrderLabelParams {
  orderId: string;
}

export const usePrintOrderLabel = (
  options?: UseMutationOptions<PrintOrderLabelResponse, HikeError<null>, PrintOrderLabelMutationParams>
) =>
  useMutation({
    mutationKey: ['printOrderLabel'],
    mutationFn: async ({ orderId, ...params }) => await printOrderLabel(orderId, params),
    ...options
  });
