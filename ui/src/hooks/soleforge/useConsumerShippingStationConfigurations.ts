import { getConsumerShippingStationConfigurations } from '@hike/services';
import { HikeError, ShippingStationConfiguration } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseConsumerShippingStationConfigurationsOptions
  extends Omit<UseQueryOptions<ShippingStationConfiguration[], HikeError<null>>, 'queryFn' | 'queryKey'> {
  queryKey?: QueryKey;
}

export const useConsumerShippingStationConfigurations = ({
  queryKey = [],
  ...options
}: UseConsumerShippingStationConfigurationsOptions = {}) =>
  useQuery<ShippingStationConfiguration[], HikeError<null>>({
    queryKey: ['consumerShippingStationConfigurations', queryKey],
    queryFn: async () => await getConsumerShippingStationConfigurations(),
    ...options
  });
