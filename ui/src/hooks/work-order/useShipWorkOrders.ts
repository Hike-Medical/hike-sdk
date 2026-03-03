import { shipWorkOrders } from '@hike/services';
import type { HikeError, ShipWorkOrdersParams, ShipWorkOrdersResult } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useShipWorkOrders = (
  options?: UseMutationOptions<ShipWorkOrdersResult[], HikeError<null>, ShipWorkOrdersParams>
) =>
  useMutation({
    mutationKey: ['shipWorkOrders'],
    mutationFn: async (params) => await shipWorkOrders(params),
    ...options
  });
