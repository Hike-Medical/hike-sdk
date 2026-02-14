import { fetchPackingJobs } from '@hike/services';
import { HikeError, PackingJobsResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UsePackingJobs extends Omit<UseQueryOptions<PackingJobsResponse, HikeError<null>>, 'queryFn' | 'queryKey'> {
  queryKey?: QueryKey;
}

export const usePackingJobs = ({ queryKey = [], ...options }: UsePackingJobs = {}) =>
  useQuery<PackingJobsResponse, HikeError<null>>({
    queryKey: ['packingJobs', queryKey],
    queryFn: async () => await fetchPackingJobs(),
    ...options
  });
