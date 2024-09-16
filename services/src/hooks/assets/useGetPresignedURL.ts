import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { GenerateSignedURLParams, GenerateSignedURLResponse, getPreSignedURL } from '../../api/scan.service';
import { HikeError } from '../../errors/HikeError';

export const useCreatePresignedUrl = (
  mutationOptions?: UseMutationOptions<GenerateSignedURLResponse, HikeError<null>, GenerateSignedURLParams>
) => {
  return useMutation({
    mutationKey: ['createPresignedUrl'],
    mutationFn: ({ footId, ...body }: GenerateSignedURLParams) => getPreSignedURL(footId, body),
    ...mutationOptions
  });
};
