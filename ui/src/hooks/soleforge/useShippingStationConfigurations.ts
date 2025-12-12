import { getShippingStationConfigurations } from '@hike/services';
import { HikeError, ShippingStationConfiguration } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseShippingStationConfigurationsOptions
  extends Omit<UseQueryOptions<ShippingStationConfiguration[], HikeError<null>>, 'queryFn' | 'queryKey'> {
  queryKey?: QueryKey;
}

export const useShippingStationConfigurations = ({
  queryKey = [],
  ...options
}: UseShippingStationConfigurationsOptions = {}) =>
  useQuery<ShippingStationConfiguration[], HikeError<null>>({
    queryKey: ['shippingStationConfigurations', queryKey],
    queryFn: async () => await getShippingStationConfigurations(),
    ...options
  });

