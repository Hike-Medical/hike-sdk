import { CreateOrderParams, Order } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { createOrder } from '../../api/order.service';
import { HikeError } from '../../errors/HikeError';

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
