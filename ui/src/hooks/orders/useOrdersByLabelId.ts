import { fetchOrdersByLabelId, HikeError } from '@hike/services';
import type { ShippingLabelResponseByShipmentId } from '@hike/types';
import { useQuery } from '@tanstack/react-query';

interface UseOrdersByLabelId {
  key?: string[];
  enabled?: boolean;
  labelId: string;
}

export const useOrdersByLabelId = ({ key = [], enabled = true, ...params }: UseOrdersByLabelId) =>
  useQuery<ShippingLabelResponseByShipmentId, HikeError<null>>({
    queryKey: ['orderByLabelId', ...key, params],
    queryFn: async () => await fetchOrdersByLabelId(params.labelId),
    enabled
  });
