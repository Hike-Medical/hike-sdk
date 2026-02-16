import { createSampleKitOrder } from '@hike/services';
import type { CreateSampleKitOrderParams, CreateSampleKitOrderResponse, HikeError } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

interface UseCreateSampleKitOrderOptions
  extends Omit<
    UseMutationOptions<CreateSampleKitOrderResponse, HikeError<null>, CreateSampleKitOrderParams>,
    'mutationFn'
  > {}

export const useCreateSampleKitOrder = (options?: UseCreateSampleKitOrderOptions) =>
  useMutation({
    mutationFn: async (params: CreateSampleKitOrderParams) => await createSampleKitOrder(params),
    ...options
  });
