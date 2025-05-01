import { GenerateSignedURLParams, GenerateSignedURLResponse, HikeError, getPreSignedURL } from '@hike/services';
import { CreateMultipartUrls } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useCreatePresignedUrl = (
  mutationOptions?: UseMutationOptions<
    GenerateSignedURLResponse | CreateMultipartUrls,
    HikeError<null>,
    GenerateSignedURLParams
  >
) =>
  useMutation({
    mutationKey: ['createPresignedUrl'],
    mutationFn: ({ footId, ...body }) => getPreSignedURL(footId, body),
    ...mutationOptions
  });
