import { revertCompletedOrder } from '@hike/services';
import { HikeError, RevertCompletedOrderParams, RevertCompletedOrderResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useRevertCompletedOrder = (
  options?: UseMutationOptions<RevertCompletedOrderResponse, HikeError<null>, RevertCompletedOrderParams>
) =>
  useMutation({
    mutationKey: ['revertCompletedOrder'],
    mutationFn: async (params) => await revertCompletedOrder(params),
    ...options
  });
