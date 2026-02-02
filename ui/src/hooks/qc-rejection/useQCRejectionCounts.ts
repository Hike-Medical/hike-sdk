import { getQCRejectionCounts } from '@hike/services';
import type { GetQCRejectionCountsParams, HikeError, QCRejectionCountsResponse } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useQCRejectionCounts = (
  params?: GetQCRejectionCountsParams,
  options?: Omit<UseQueryOptions<QCRejectionCountsResponse, HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['qcRejectionCounts', params],
    queryFn: async () => await getQCRejectionCounts(params),
    ...options
  });
