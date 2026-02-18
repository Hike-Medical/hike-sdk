import { revertOrderToManufacturing } from '@hike/services';
import { HikeError, RevertOrderToManufacturingParams, RevertOrderToManufacturingResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useRevertOrderToManufacturing = (
  options?: UseMutationOptions<RevertOrderToManufacturingResponse, HikeError<null>, RevertOrderToManufacturingParams>
) =>
  useMutation({
    mutationKey: ['revertOrderToManufacturing'],
    mutationFn: async (params) => await revertOrderToManufacturing(params),
    ...options
  });
