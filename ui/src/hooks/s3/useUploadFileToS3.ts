import { HikeError } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import axios from 'axios';

interface UploadFileToS3Params {
  file: File | Blob | Buffer;
  presignedUrl: string;
  onProgress?: (progress: number) => void;
  contentType?: string;
}

export const useUploadFileToS3 = (
  options?: Omit<UseMutationOptions<void, HikeError<null>, UploadFileToS3Params>, 'mutationKey' | 'mutationFn'>
) =>
  useMutation({
    mutationKey: ['uploadFileToS3'],
    mutationFn: async ({ file, presignedUrl, onProgress, contentType }) => {
      const headers: Record<string, string> = {};

      // Only add Content-Type if explicitly provided
      if (contentType) {
        headers['Content-Type'] = contentType;
      }

      await axios.put(presignedUrl, file, {
        headers: Object.keys(headers).length > 0 ? headers : undefined,
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = (progressEvent.loaded / progressEvent.total) * 100;
            onProgress(progress);
          }
        }
      });
    },
    ...options
  });
