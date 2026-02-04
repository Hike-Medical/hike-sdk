import { getRejectionPrintjobs } from '@hike/services';
import type { HikeError, PrintJobWithDetails } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useRejectionPrintjobs = (
  rejectionId: string | undefined,
  options?: Omit<UseQueryOptions<PrintJobWithDetails[], HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['rejectionPrintjobs', rejectionId],
    queryFn: async () => {
      if (!rejectionId) throw new Error('Rejection ID required');
      return await getRejectionPrintjobs(rejectionId);
    },
    enabled: !!rejectionId,
    ...options
  });
