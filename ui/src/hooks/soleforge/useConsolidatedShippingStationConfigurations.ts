import { getConsolidatedShippingStationConfigurations } from '@hike/services';
import { HikeError, ShippingStationConfiguration } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseConsolidatedShippingStationConfigurationsOptions
  extends Omit<UseQueryOptions<ShippingStationConfiguration[], HikeError<null>>, 'queryFn' | 'queryKey'> {
  queryKey?: QueryKey;
}

export const useConsolidatedShippingStationConfigurations = ({
  queryKey = [],
  ...options
}: UseConsolidatedShippingStationConfigurationsOptions = {}) =>
  useQuery<ShippingStationConfiguration[], HikeError<null>>({
    queryKey: ['consolidatedShippingStationConfigurations', queryKey],
    queryFn: async () => await getConsolidatedShippingStationConfigurations(),
    ...options
  });

