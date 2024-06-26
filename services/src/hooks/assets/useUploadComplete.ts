import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { uploadComplete } from '../../api/asset.service';
import { ResponseError } from '../../errors/ResponseError';

export const useUploadComplete = (mutationOptions?: UseMutationOptions<void, ResponseError<null>, string>) => {
  return useMutation({
    mutationKey: ['uploadComplete'],
    mutationFn: (assetId: string) => uploadComplete(assetId),
    ...mutationOptions
  });
};
