import { CreateMultipartUrls } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { GenerateSignedURLParams, GenerateSignedURLResponse, getPreSignedURL } from '../../api/scan.service';
import { HikeError } from '../../errors/HikeError';

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
