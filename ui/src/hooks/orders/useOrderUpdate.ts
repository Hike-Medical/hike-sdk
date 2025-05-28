import { updateOrder } from '@hike/services';
import { HikeError, Order, UpdateOrderParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface UpdateOrderContext {
  orderId: string;
  body: UpdateOrderParams;
  jwtToken?: string;
  companyIds?: string[];
}

export const useOrderUpdate = (options?: UseMutationOptions<Order, HikeError<Order>, UpdateOrderContext>) =>
  useMutation({
    mutationKey: ['updateOrder'],
    mutationFn: async ({ orderId, body, jwtToken, companyIds }) =>
      await updateOrder(orderId, body, jwtToken, companyIds),
    ...options
  });
