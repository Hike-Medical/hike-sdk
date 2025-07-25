import { exportAugments } from '@hike/services';
import { GetAugmentsParams, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useExportAugments = (options?: UseMutationOptions<Blob, HikeError<null>, GetAugmentsParams>) =>
  useMutation({
    mutationKey: ['exportAugments'],
    mutationFn: async (params) => await exportAugments(params),
    ...options
  });
