import { fetchPendingShippingLabels } from '@hike/services';
import { HikeError, ShippingLabel } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseGetPendingLabels extends Omit<UseQueryOptions<ShippingLabel[], HikeError<null>>, 'queryFn' | 'queryKey'> {
  queryKey?: QueryKey;
}

export const useGetPendingLabels = ({ queryKey = [], ...options }: UseGetPendingLabels) =>
  useQuery<ShippingLabel[], HikeError<null>>({
    queryKey: ['getPendingLabels', queryKey],
    queryFn: async () => await fetchPendingShippingLabels(),
    ...options
  });
