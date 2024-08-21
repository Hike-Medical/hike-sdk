import type { ShippingLabelResponseByShipmentId } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { fetchOrdersByLabelId } from '../../api/shipping.service';
import { ResponseError } from '../../errors/ResponseError';

export interface UseOrdersByLabelId {
  key?: string[];
  enabled?: boolean;
  labelId: string;
}

export const useOrdersByLabelId = ({ key = [], enabled = true, ...params }: UseOrdersByLabelId) =>
  useQuery<ShippingLabelResponseByShipmentId, ResponseError<null>>({
    queryKey: ['orderByLabelId', ...key, params],
    queryFn: async () => await fetchOrdersByLabelId(params.labelId),
    enabled
  });
