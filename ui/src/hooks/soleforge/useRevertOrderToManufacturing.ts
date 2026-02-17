import { revertGrindingOrderToManufacturing } from '@hike/services';
import { HikeError, RevertGrindingOrderParams, RevertGrindingOrderResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useRevertOrderToManufacturing = (
  options?: UseMutationOptions<RevertGrindingOrderResponse, HikeError<null>, RevertGrindingOrderParams>
) =>
  useMutation({
    mutationKey: ['revertOrderToManufacturing'],
    mutationFn: async (params) => await revertGrindingOrderToManufacturing(params),
    ...options
  });
