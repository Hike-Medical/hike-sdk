import { getQCRejectionReasons } from '@hike/services';
import type { GetQCRejectionReasonsParams, HikeError, QCRejectionReason } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useQCRejectionReasons = (
  params?: GetQCRejectionReasonsParams,
  options?: Omit<UseQueryOptions<QCRejectionReason[], HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['qcRejectionReasons', params],
    queryFn: async () => await getQCRejectionReasons(params),
    ...options
  });
