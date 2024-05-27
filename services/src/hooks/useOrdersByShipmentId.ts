import type { ShippingLabelResponseByShipmentId } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { fetchOrdersByShipmentId } from '../api/shipping.service';
import { ResponseError } from '../errors/ResponseError';

export interface UseOrdersByShipmentId {
  key?: string[];
  enabled?: boolean;
  shipmentId: string;
}

export const useOrdersByShipmentId = ({ key = [], enabled = true, ...params }: UseOrdersByShipmentId) =>
  useQuery<ShippingLabelResponseByShipmentId, ResponseError<null>>({
    queryKey: ['orderByShipmentId', ...key, params],
    queryFn: async () => await fetchOrdersByShipmentId(params.shipmentId),
    enabled
  });
