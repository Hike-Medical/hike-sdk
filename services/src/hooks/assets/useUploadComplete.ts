import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { uploadComplete } from '../../api/asset.service';
import { HikeError } from '../../errors/HikeError';

export const useUploadComplete = (mutationOptions?: UseMutationOptions<void, HikeError<null>, string>) =>
  useMutation({
    mutationKey: ['uploadComplete'],
    mutationFn: (assetId) => uploadComplete(assetId),
    ...mutationOptions
  });
