import { confirmPackedOrders } from '@hike/services';
import { ConfirmPackedOrdersBody, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useConfirmPackedOrders = (options?: UseMutationOptions<void, HikeError<null>, ConfirmPackedOrdersBody>) =>
  useMutation({
    mutationKey: ['confirmPackedOrders'],
    mutationFn: async (body) => await confirmPackedOrders(body),
    ...options
  });
