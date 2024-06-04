import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface UploadVideoParams {
  video: File | Buffer | Blob;
  s3Url: string;
  tagSet?: Record<string, string>;
}

export const useUploadVideoToS3 = (
  mutationOptions?: Omit<UseMutationOptions<void, Error, UploadVideoParams>, 'mutationKey' | 'mutationFn'>
) => {
  return useMutation({
    mutationKey: ['uploadVideoToS3'],
    mutationFn: async ({ video, s3Url, tagSet }: UploadVideoParams) => {
      let tagString: string | undefined;

      if (tagSet) {
        tagString = Object.entries(tagSet)
          .map(([key, value]) => {
            return `${key}=${value}`;
          })
          .join('&');
      }

      if (video instanceof File) {
        const formData = new FormData();
        formData.append('file', video);
        const response = await fetch(s3Url, {
          method: 'PUT',
          body: video,
          headers: {
            'Content-Type': video.type,
            ...(tagString && { 'x-amz-tagging': tagString })
          }
        });

        if (!response.ok) {
          throw new Error('Failed to upload video');
        }
      }

      if (video instanceof Blob || video instanceof Buffer) {
        const response = await fetch(s3Url, {
          method: 'PUT',
          body: video,
          headers: {
            'Content-Type': 'video/mp4',
            ...(tagString && { 'x-amz-tagging': tagString })
          }
        });

        if (!response.ok) {
          throw new Error('Failed to upload video');
        }
      }
    },
    ...mutationOptions
  });
};
