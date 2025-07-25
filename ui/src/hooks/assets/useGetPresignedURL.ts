import { GenerateSignedURLParams, GenerateSignedURLResponse, getPreSignedURL } from '@hike/services';
import { CreateMultipartUrls, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useCreatePresignedUrl = (
  options?: UseMutationOptions<
    GenerateSignedURLResponse | CreateMultipartUrls,
    HikeError<null>,
    GenerateSignedURLParams
  >
) =>
  useMutation({
    mutationKey: ['createPresignedUrl'],
    mutationFn: ({ footId, ...body }) => getPreSignedURL(footId, body),
    ...options
  });
