import type { GetShipengineLabelsParams, GetShipengineLabelsResponse } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { fetchLabels } from '../../api/shipping.service';
import { HikeError } from '../../errors/HikeError';

export interface UseGetShipengineLabelsOptions extends GetShipengineLabelsParams {
  key?: string[];
  enabled?: boolean;
}

export const useLabels = ({ key = [], enabled = true, ...params }: UseGetShipengineLabelsOptions = {}) =>
  useQuery<GetShipengineLabelsResponse, HikeError<null>>({
    queryKey: ['labels', ...key, params],
    queryFn: async () => await fetchLabels(params),
    enabled
  });
