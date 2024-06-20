import { Order, UpdateOrderParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { updateOrder } from '../api/order.service';

interface UpdateOrderContext {
  orderId: string;
  body: UpdateOrderParams;
}

export const useOrderUpdate = (options?: UseMutationOptions<Order, Error, UpdateOrderContext>) => {
  return useMutation({
    mutationKey: ['updateOrder'],
    mutationFn: async ({ orderId, body }: UpdateOrderContext) => await updateOrder(orderId, body),
    ...options
  });
};
