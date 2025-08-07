import { getPrintFarmWorkbenches } from '@hike/services';
import { GetPrintFarmWorkbenchParams, HikeError, PagedResponse, PrintFarmWorkbench } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UsePrintFarmWorkbenchOptions
  extends Omit<UseQueryOptions<PagedResponse<PrintFarmWorkbench[]>, HikeError<null>>, 'queryFn' | 'queryKey'> {
  params?: GetPrintFarmWorkbenchParams;
  companyIds?: string[];
  queryKey?: QueryKey;
}

export const usePrintFarmWorkbench = ({
  params,
  companyIds,
  queryKey = [],
  ...options
}: UsePrintFarmWorkbenchOptions) =>
  useQuery<PagedResponse<PrintFarmWorkbench[]>, HikeError<null>>({
    queryKey: ['usePrintFarmWorkbench', params, companyIds, queryKey],
    queryFn: async () => await getPrintFarmWorkbenches(params, companyIds),
    ...options
  });
