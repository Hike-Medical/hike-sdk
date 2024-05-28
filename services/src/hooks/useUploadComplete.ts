import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { uploadComplete } from '../api/asset.service';

export const useUploadComplete = (mutationOptions?: UseMutationOptions<void, unknown, string>) => {
  return useMutation({
    mutationKey: ['uploadComplete'],
    mutationFn: (assetId: string) => uploadComplete(assetId),
    ...mutationOptions
  });
};
