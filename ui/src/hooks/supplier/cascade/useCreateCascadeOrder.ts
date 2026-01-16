import { createCascadeOrder } from '@hike/services';
import type { CascadeOrderRequest, CascadeOrderResponse } from '@hike/types';
import { HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useCreateCascadeOrder = (
  options?: Omit<UseMutationOptions<CascadeOrderResponse, HikeError<null>, CascadeOrderRequest>, 'mutationFn'>
) =>
  useMutation({
    mutationKey: ['createCascadeOrder'],
    mutationFn: async (params) => await createCascadeOrder(params),
    ...options
  });
