import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { GenerateSignedURLParams, GenerateSignedURLResponse, getPreSignedURL } from '../../api/scan.service';
import { ResponseError } from '../../errors/ResponseError';

export const useCreatePresignedUrl = (
  mutationOptions?: UseMutationOptions<GenerateSignedURLResponse, ResponseError<null>, GenerateSignedURLParams>
) => {
  return useMutation({
    mutationKey: ['createPresignedUrl'],
    mutationFn: ({ footId, ...body }: GenerateSignedURLParams) => getPreSignedURL(footId, body),
    ...mutationOptions
  });
};
