import type { ShippingLabelResponseByShipmentId } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { fetchOrdersByShipmentId } from '../api/shipping.service';

export interface OrdersByShipmentId {
  shipmentId: string;
}

export const useOrdersByShipmentId = (
  mutationOptions?: UseMutationOptions<ShippingLabelResponseByShipmentId, Error, OrdersByShipmentId>
) => {
  return useMutation({
    mutationKey: ['orderByShipmentId'],
    mutationFn: async ({ shipmentId }: OrdersByShipmentId) => await fetchOrdersByShipmentId(shipmentId),
    ...mutationOptions
  });
};
