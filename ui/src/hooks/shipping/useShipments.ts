import { fetchShipments } from '@hike/services';
import type { GetShipengineShipmentsParams, GetShipengineShipmentsResponse } from '@hike/types';
import { HikeError } from '@hike/types';
import { useQuery } from '@tanstack/react-query';

interface UseGetShipengineShipmentsOptions extends GetShipengineShipmentsParams {
  key?: string[];
  enabled?: boolean;
}

export const useShipments = ({ key = [], enabled = true, ...params }: UseGetShipengineShipmentsOptions = {}) =>
  useQuery<GetShipengineShipmentsResponse, HikeError<null>>({
    queryKey: ['shipments', ...key, params],
    queryFn: async () => await fetchShipments(params),
    enabled
  });
