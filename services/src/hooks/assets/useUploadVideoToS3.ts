import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { HikeError } from '../../errors/HikeError';

interface UploadVideoParams {
  video: File | Buffer | Blob;
  s3Url: string;
  tagSet?: Record<string, string>;
  onProgress?: (progress: number) => void;
}

export const useUploadVideoToS3 = (
  mutationOptions?: Omit<UseMutationOptions<void, HikeError<null>, UploadVideoParams>, 'mutationKey' | 'mutationFn'>
) => {
  return useMutation({
    mutationKey: ['uploadVideoToS3'],
    mutationFn: ({ video, s3Url, tagSet, onProgress }: UploadVideoParams) => {
      console.log('Starting video upload to S3');
      return new Promise<void>((resolve, reject) => {
        let tagString: string | undefined;
        if (tagSet) {
          tagString = Object.entries(tagSet)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
          console.log('Tag string:', tagString);
        }

        const xhr = new XMLHttpRequest();
        // 10 minutes timeout
        xhr.timeout = 10 * 60 * 1000;
        console.log('XHR timeout set to', xhr.timeout, 'ms');

        let lastLoaded = 0;
        let startTime = Date.now();
        let progressCount = 0;

        xhr.upload.addEventListener('loadstart', () => {
          console.log('Upload started');
        });

        xhr.upload.addEventListener('progress', (event) => {
          progressCount++;
          if (onProgress) {
            const now = Date.now();
            const loadDelta = event.loaded - lastLoaded;
            const timeDelta = now - startTime;

            console.log(`Progress event #${progressCount}:`, {
              loaded: event.loaded,
              total: event.total,
              lengthComputable: event.lengthComputable
            });

            if (event.lengthComputable) {
              const progress = (event.loaded / event.total) * 100;
              console.log('Computed progress:', progress.toFixed(2) + '%');
              onProgress(progress);
            } else if (timeDelta > 0) {
              const speed = loadDelta / timeDelta;
              console.log('Upload speed:', speed.toFixed(2), 'bytes/ms');
              const estimatedTotal = video instanceof File ? video.size : (video as Blob).size;
              const estimatedProgress = Math.min((event.loaded / estimatedTotal) * 100, 99);
              console.log('Estimated progress:', estimatedProgress.toFixed(2) + '%');
              onProgress(estimatedProgress);
            }

            lastLoaded = event.loaded;
            startTime = now;
          }
        });

        xhr.upload.addEventListener('error', (event) => {
          console.error('Upload error:', event);
          reject(new Error(`Failed to upload video: ${event.type}`));
        });

        xhr.upload.addEventListener('abort', () => {
          console.warn('Upload aborted');
          reject(new Error('Upload aborted'));
        });

        xhr.onreadystatechange = () => {
          console.log('XHR ready state changed:', xhr.readyState);
          if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log('XHR DONE. Status:', xhr.status);
            if (xhr.status >= 200 && xhr.status < 300) {
              console.log('Upload successful');
              resolve();
            } else {
              console.error('Upload failed. Status:', xhr.status, 'Response:', xhr.responseText);
              reject(new Error(`Failed to upload video. Status: ${xhr.status}, Response: ${xhr.responseText}`));
            }
          }
        };

        xhr.ontimeout = () => {
          console.error('Upload timed out');
          reject(new Error('Upload timed out'));
        };

        xhr.open('PUT', s3Url, true);
        console.log('XHR opened with URL:', s3Url);

        if (video instanceof File) {
          xhr.setRequestHeader('Content-Type', video.type);
          console.log('Content-Type set:', video.type);
        }

        if (tagString) {
          xhr.setRequestHeader('x-amz-tagging', tagString);
          console.log('x-amz-tagging header set');
        }

        console.log('Sending video. Size:', video instanceof File ? video.size : (video as Blob).size, 'bytes');
        xhr.send(video);
      });
    },
    ...mutationOptions
  });
};
