import { exportAssetsCsv } from '@hike/services';
import { GetAssetsParams, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useExportAssetsCsv = (
  options?: UseMutationOptions<Blob, HikeError<null>, GetAssetsParams>
) =>
  useMutation({
    mutationKey: ['exportAssetsCsv'],
    mutationFn: async (params) => await exportAssetsCsv(params),
    ...options
  });
