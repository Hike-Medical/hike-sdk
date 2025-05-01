import { HikeError, uploadComplete } from '@hike/services';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useUploadComplete = (mutationOptions?: UseMutationOptions<void, HikeError<null>, string>) =>
  useMutation({
    mutationKey: ['uploadComplete'],
    mutationFn: (assetId) => uploadComplete(assetId),
    ...mutationOptions
  });
