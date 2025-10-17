import { getCompletedStation } from '@hike/services';
import { GetCompletedStationParams, HikeError, PagedResponse, StationWorkbench } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseCompletedStationOptions
  extends Omit<UseQueryOptions<PagedResponse<StationWorkbench[]>, HikeError<null>>, 'queryFn' | 'queryKey'> {
  params: GetCompletedStationParams;
  companyIds: string[];
  queryKey?: QueryKey;
}

export const useCompletedStation = ({ params, companyIds, queryKey = [], ...options }: UseCompletedStationOptions) =>
  useQuery<PagedResponse<StationWorkbench[]>, HikeError<null>>({
    queryKey: ['useCompletedStation', params, companyIds, queryKey],
    queryFn: async () => await getCompletedStation(params, companyIds),
    ...options
  });
