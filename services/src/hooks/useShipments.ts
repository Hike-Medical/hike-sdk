import type { GetShipengineShipmentsParams, GetShipengineShipmentsResponse } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { fetchShipments } from '../api/shipping.service';
import { ResponseError } from '../errors/ResponseError';

export interface UseGetShipengineShipmentsOptions extends GetShipengineShipmentsParams {
  key?: string[];
  enabled?: boolean;
}

export const useShipments = ({ key = [], enabled = true, ...params }: UseGetShipengineShipmentsOptions = {}) =>
  useQuery<GetShipengineShipmentsResponse, ResponseError<null>>({
    queryKey: ['shipments', ...key, params],
    queryFn: async () => await fetchShipments(params),
    enabled
  });
