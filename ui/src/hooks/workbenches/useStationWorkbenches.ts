import { getStationWorkbenches } from '@hike/services';
import { GetStationsParams, HikeError, PagedResponse, StationWorkbench } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseStationWorkbenchesOptions
  extends Omit<UseQueryOptions<PagedResponse<StationWorkbench[]>, HikeError<null>>, 'queryFn' | 'queryKey'> {
  params?: GetStationsParams;
  companyIds?: string[];
  queryKey?: QueryKey;
}

export const useStationWorkbenches = ({
  params,
  companyIds,
  queryKey = [],
  ...options
}: UseStationWorkbenchesOptions) =>
  useQuery<PagedResponse<StationWorkbench[]>, HikeError<null>>({
    queryKey: ['useStationWorkbenches', params, companyIds, queryKey],
    queryFn: async () => await getStationWorkbenches(params, companyIds),
    ...options
  });
