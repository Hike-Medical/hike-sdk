import { getPastTenseStations } from '@hike/services';
import { GetPastTenseStationsParams, HikeError, PagedResponse, StationWorkbench } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UsePastTenseStationsOptions
  extends Omit<UseQueryOptions<PagedResponse<StationWorkbench[]>, HikeError<null>>, 'queryFn' | 'queryKey'> {
  params: GetPastTenseStationsParams;
  companyIds?: string[];
  queryKey?: QueryKey;
}

export const usePastTenseStations = ({ params, companyIds, queryKey = [], ...options }: UsePastTenseStationsOptions) =>
  useQuery<PagedResponse<StationWorkbench[]>, HikeError<null>>({
    queryKey: ['usePastTenseStations', params, companyIds, queryKey],
    queryFn: async () => await getPastTenseStations(params, companyIds),
    ...options
  });
