import type { GetShipengineLabelsParams, GetShipengineLabelsResponse } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { fetchLabels } from '../../api/shipping.service';
import { ResponseError } from '../../errors/ResponseError';

export interface UseGetShipengineLabelsOptions extends GetShipengineLabelsParams {
  key?: string[];
  enabled?: boolean;
}

export const useLabels = ({ key = [], enabled = true, ...params }: UseGetShipengineLabelsOptions = {}) =>
  useQuery<GetShipengineLabelsResponse, ResponseError<null>>({
    queryKey: ['labels', ...key, params],
    queryFn: async () => await fetchLabels(params),
    enabled
  });
