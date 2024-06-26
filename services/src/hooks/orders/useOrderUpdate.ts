import { Order, UpdateOrderParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { updateOrder } from '../../api/order.service';
import { ResponseError } from '../../errors/ResponseError';

interface UpdateOrderContext {
  orderId: string;
  body: UpdateOrderParams;
  jwtToken?: string;
  companyIds?: string[];
}

export const useOrderUpdate = (options?: UseMutationOptions<Order, ResponseError<Order>, UpdateOrderContext>) => {
  return useMutation({
    mutationKey: ['updateOrder'],
    mutationFn: async ({ orderId, body, jwtToken, companyIds }: UpdateOrderContext) =>
      await updateOrder(orderId, body, jwtToken, companyIds),
    ...options
  });
};
