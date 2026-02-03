import { getQCRejections } from '@hike/services';
import type { GetQCRejectionsParams, HikeError, QCRejectionWithRelations } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useQCRejections = (
  params?: GetQCRejectionsParams,
  options?: Omit<UseQueryOptions<QCRejectionWithRelations[], HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['qcRejections', params],
    queryFn: async () => await getQCRejections(params),
    ...options
  });
