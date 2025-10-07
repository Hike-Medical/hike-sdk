import { generateFileUploadUrl } from '@hike/services';
import { HikeError } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useGenerateFileUploadUrl = (
  options?: Omit<
    UseMutationOptions<
      { presignedUrl: string; key: string; bucket: string; region: string },
      HikeError<null>,
      { fileName: string; contentType?: string }
    >,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['generateFileUploadUrl'],
    mutationFn: ({ fileName, contentType }) => generateFileUploadUrl(fileName, contentType),
    ...options
  });
