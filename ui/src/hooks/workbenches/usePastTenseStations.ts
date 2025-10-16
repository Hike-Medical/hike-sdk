import { getPastTenseStations } from '@hike/services';
import { HikeError, PagedResponse, StationWorkbench } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UsePastTenseStationsOptions
  extends Omit<UseQueryOptions<PagedResponse<StationWorkbench[]>, HikeError<null>>, 'queryFn' | 'queryKey'> {
  previousStatus: string;
  companyIds?: string[];
  offset?: number;
  limit?: number;
  queryKey?: QueryKey;
}

export const usePastTenseStations = ({
  previousStatus,
  companyIds,
  offset = 0,
  limit,
  queryKey = [],
  ...options
}: UsePastTenseStationsOptions) =>
  useQuery<PagedResponse<StationWorkbench[]>, HikeError<null>>({
    queryKey: ['usePastTenseStations', previousStatus, companyIds, offset, limit, queryKey],
    queryFn: async () => await getPastTenseStations({ previousStatus, offset, limit }, companyIds),
    ...options
  });
