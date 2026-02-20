import { resolveMissingOrder } from '@hike/services';
import { HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useResolveMissingOrder = (options?: UseMutationOptions<void, HikeError<null>, string>) =>
  useMutation({
    mutationKey: ['resolveMissingOrder'],
    mutationFn: async (orderId) => await resolveMissingOrder(orderId),
    ...options
  });
