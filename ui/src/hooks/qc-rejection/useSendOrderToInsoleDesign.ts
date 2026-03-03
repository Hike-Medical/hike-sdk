import { sendOrderToInsoleDesign } from '@hike/services';
import type { HikeError, QCRejection, SendToInsoleDesignParams } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useSendOrderToInsoleDesign = (
  options?: UseMutationOptions<QCRejection, HikeError<null>, SendToInsoleDesignParams>
) =>
  useMutation({
    mutationKey: ['sendOrderToInsoleDesign'],
    mutationFn: async (params) => await sendOrderToInsoleDesign(params),
    ...options
  });
