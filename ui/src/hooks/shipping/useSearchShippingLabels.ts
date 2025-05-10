import { HikeError, findShippingLabels } from '@hike/services';
import type { ShippingLabel } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseSearchShippingLabelsOptions
  extends Omit<UseQueryOptions<ShippingLabel[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  query: string;
  queryKey?: QueryKey;
}

export const useSearchShippingLabels = ({ query, queryKey = [], ...options }: UseSearchShippingLabelsOptions) =>
  useQuery({
    queryKey: ['searchShippingLabels', query, queryKey],
    queryFn: async () => await findShippingLabels(query),
    ...options
  });
