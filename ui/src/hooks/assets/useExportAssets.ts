import { exportAssets } from '@hike/services';
import { GetAssetsParams, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useExportAssets = (options?: UseMutationOptions<Blob, HikeError<null>, GetAssetsParams>) =>
  useMutation({
    mutationKey: ['exportAssets'],
    mutationFn: async (params) => await exportAssets(params),
    ...options
  });
