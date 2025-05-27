import { createOrder } from '@hike/services';
import { CreateOrderParams, HikeError, Order } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface CreateOrderContext {
  body: CreateOrderParams;
  companyIds: string[];
}

export const useCreateOrder = (options?: UseMutationOptions<Order, HikeError<Order>, CreateOrderContext>) =>
  useMutation({
    mutationKey: ['updateOrder'],
    mutationFn: async ({ body, companyIds }) => await createOrder(body, companyIds),
    ...options
  });
