import { bulkTagPatients } from '@hike/services';
import { BulkTagPatientsParams, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useBulkTagPatients = (
  options?: UseMutationOptions<{ count: number }, HikeError<null>, BulkTagPatientsParams>
) =>
  useMutation({
    mutationKey: ['bulkTagPatients'],
    mutationFn: async (params) => await bulkTagPatients(params),
    ...options
  });
