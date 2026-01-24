import { revertGrindingOrderToManufacturing } from '@hike/services';
import { HikeError, RevertGrindingOrderParams, RevertGrindingOrderResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useRevertGrindingOrder = (
  options?: UseMutationOptions<RevertGrindingOrderResponse, HikeError<null>, RevertGrindingOrderParams>
) =>
  useMutation({
    mutationKey: ['revertGrindingOrder'],
    mutationFn: async (params) => await revertGrindingOrderToManufacturing(params),
    ...options
  });
