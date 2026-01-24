import { revertManualReprintOrderToManufacturing } from '@hike/services';
import { HikeError, RevertManualReprintOrderParams, RevertManualReprintOrderResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useRevertManualReprintOrder = (
  options?: UseMutationOptions<
    RevertManualReprintOrderResponse,
    HikeError<null>,
    RevertManualReprintOrderParams
  >
) =>
  useMutation({
    mutationKey: ['revertManualReprintOrder'],
    mutationFn: async (params) => await revertManualReprintOrderToManufacturing(params),
    ...options
  });
