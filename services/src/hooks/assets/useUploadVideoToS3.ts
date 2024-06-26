import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { ResponseError } from '../../errors/ResponseError';

interface UploadVideoParams {
  video: File | Buffer | Blob;
  s3Url: string;
  tagSet?: Record<string, string>;
  onProgress?: (progress: number) => void; // Progress callback
}

export const useUploadVideoToS3 = (
  mutationOptions?: Omit<UseMutationOptions<void, ResponseError<null>, UploadVideoParams>, 'mutationKey' | 'mutationFn'>
) => {
  return useMutation({
    mutationKey: ['uploadVideoToS3'],
    mutationFn: ({ video, s3Url, tagSet, onProgress }: UploadVideoParams) => {
      return new Promise<void>((resolve, reject) => {
        let tagString: string | undefined;

        if (tagSet) {
          tagString = Object.entries(tagSet)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
        }

        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable && onProgress) {
            onProgress((event.loaded / event.total) * 100);
          }
        });

        xhr.upload.addEventListener('error', () => {
          reject(new Error('Failed to upload video'));
        });

        xhr.upload.addEventListener('abort', () => {
          reject(new Error('Upload aborted'));
        });

        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve();
            } else {
              reject(new Error('Failed to upload video'));
            }
          }
        };

        xhr.open('PUT', s3Url, true);

        if (video instanceof File) {
          xhr.setRequestHeader('Content-Type', video.type);
        }

        if (tagString) {
          xhr.setRequestHeader('x-amz-tagging', tagString);
        }

        xhr.send(video);
      });
    },
    ...mutationOptions
  });
};
