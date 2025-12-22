import { getCompatiblePrinters } from '@hike/services';
import { CompatiblePrinter, GetCompatiblePrintersParams, HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseCompatiblePrintersOptions
  extends Omit<UseQueryOptions<CompatiblePrinter[], HikeError<null>>, 'queryFn' | 'queryKey'> {
  queryKey?: QueryKey;
}

export const useCompatiblePrinters = (params: GetCompatiblePrintersParams, options?: UseCompatiblePrintersOptions) =>
  useQuery<CompatiblePrinter[], HikeError<null>>({
    queryKey: ['compatiblePrinters', params.orderId, params.laneId, params.limit, params.statuses, options?.queryKey],
    queryFn: async () => await getCompatiblePrinters(params),
    ...options
  });
