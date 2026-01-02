import { getPrinterHistory } from '@hike/services';
import { GetPrinterHistoryParams, HikeError, SoleforgePrintJobWithAsset } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UsePrinterHistoryOptions
  extends Omit<UseQueryOptions<SoleforgePrintJobWithAsset[], HikeError<null>>, 'queryFn' | 'queryKey'> {
  queryKey?: QueryKey;
}

export const usePrinterHistory = (params: GetPrinterHistoryParams, options?: UsePrinterHistoryOptions) =>
  useQuery<SoleforgePrintJobWithAsset[], HikeError<null>>({
    queryKey: ['printerHistory', params.printerId, params.limit, options?.queryKey],
    queryFn: async () => await getPrinterHistory(params),
    enabled: !!params.printerId,
    ...options
  });
