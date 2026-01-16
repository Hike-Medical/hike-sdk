import { fetchCascadeItemInventory } from '@hike/services';
import type { CascadeAvailabilityResponse } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseCascadeItemInventoryOptions
  extends Omit<UseQueryOptions<CascadeAvailabilityResponse, HikeError<null>>, 'queryKey' | 'queryFn'> {
  itemIds: (string | number)[];
  queryKey?: QueryKey;
}

export const useCascadeItemInventory = ({ itemIds, queryKey = [], ...options }: UseCascadeItemInventoryOptions) =>
  useQuery({
    queryKey: ['cascadeItemInventory', itemIds, queryKey],
    queryFn: async () => await fetchCascadeItemInventory(itemIds),
    enabled: itemIds.length > 0,
    ...options
  });
