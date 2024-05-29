import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface UploadVideoParams {
  video: File | Buffer | Blob;
  s3Url: string;
}

export const useUploadVideoToS3 = (
  mutationOptions?: Omit<UseMutationOptions<void, Error, UploadVideoParams>, 'mutationKey' | 'mutationFn'>
) => {
  return useMutation({
    mutationKey: ['uploadVideoToS3'],
    mutationFn: async ({ video, s3Url }: UploadVideoParams) => {
      if (video instanceof File) {
        const formData = new FormData();
        formData.append('file', video);
        const response = await fetch(s3Url, {
          method: 'PUT',
          body: video
        });

        if (!response.ok) {
          throw new Error('Failed to upload video');
        }
      }

      if (video instanceof Blob || video instanceof Buffer) {
        const response = await fetch(s3Url, {
          method: 'PUT',
          body: video
        });

        if (!response.ok) {
          throw new Error('Failed to upload video');
        }
      }
    },
    ...mutationOptions
  });
};
