import { uploadComplete } from '@hike/services';
import { HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useUploadComplete = (options?: UseMutationOptions<void, HikeError<null>, string>) =>
  useMutation({
    mutationKey: ['uploadComplete'],
    mutationFn: (assetId) => uploadComplete(assetId),
    ...options
  });
