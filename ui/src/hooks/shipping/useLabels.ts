import { fetchLabels } from '@hike/services';
import type { GetShipengineLabelsParams, GetShipengineLabelsResponse } from '@hike/types';
import { HikeError } from '@hike/types';
import { useQuery } from '@tanstack/react-query';

interface UseGetShipengineLabelsOptions extends GetShipengineLabelsParams {
  key?: string[];
  enabled?: boolean;
}

export const useLabels = ({ key = [], enabled = true, ...params }: UseGetShipengineLabelsOptions = {}) =>
  useQuery<GetShipengineLabelsResponse, HikeError<null>>({
    queryKey: ['labels', ...key, params],
    queryFn: async () => await fetchLabels(params),
    enabled
  });
