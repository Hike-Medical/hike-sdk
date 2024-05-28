import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { GenerateSignedURLDto, getPreSignedURL } from '../api/scan.service';
import { GenerateSignedURLResponse } from '../api/workbench.service';

export const useCreatePresignedUrl = (
  mutationOptions?: UseMutationOptions<GenerateSignedURLResponse, Error, GenerateSignedURLDto>
) => {
  return useMutation({
    mutationKey: ['createPresignedUrl'],
    mutationFn: ({ footId, ...body }: GenerateSignedURLDto) => getPreSignedURL(footId, body),
    ...mutationOptions
  });
};
