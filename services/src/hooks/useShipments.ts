import type { GetShipmentsParams, GetShipmentsResponse } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { fetchShipments } from '../api/shipping.service';
import { ResponseError } from '../errors/ResponseError';

export interface UseGetShipmentsOptions extends GetShipmentsParams {
  key?: string[];
  enabled?: boolean;
}

export const useShipments = ({ key = [], enabled = true, ...params }: UseGetShipmentsOptions = {}) =>
  useQuery<GetShipmentsResponse, ResponseError<null>>({
    queryKey: ['shipments', ...key, params],
    queryFn: async () => await fetchShipments(params),
    enabled
  });
