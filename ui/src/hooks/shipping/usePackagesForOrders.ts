import { fetchPackagesForOrders } from '@hike/services';
import { useQuery } from '@tanstack/react-query';

export const usePackagesForOrders = (orderIds: string[]) =>
  useQuery({
    queryKey: ['packagesForOrders', orderIds],
    queryFn: async () => await fetchPackagesForOrders(orderIds),
    enabled: orderIds.length > 0
  });
