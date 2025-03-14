import type { GetShipengineShipmentsParams, GetShipengineShipmentsResponse } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { fetchShipments } from '../../api/shipping.service';
import { HikeError } from '../../errors/HikeError';

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
