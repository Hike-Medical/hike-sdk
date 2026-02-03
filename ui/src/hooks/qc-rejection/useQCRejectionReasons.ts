import { getQCRejectionReasons } from '@hike/services';
import type { GetQCRejectionReasonsParams, HikeError, QCRejectionReasonWithStations } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useQCRejectionReasons = (
  params?: GetQCRejectionReasonsParams,
  options?: Omit<UseQueryOptions<QCRejectionReasonWithStations[], HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['qcRejectionReasons', params],
    queryFn: async () => await getQCRejectionReasons(params),
    ...options
  });
