import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { GenerateSignedURLDto, getPreSignedURL } from '../api/scan.service';
import { GenerateSignedURLResponse } from '../api/workbench.service';

export const useCreatePresignedUrl = (
  footId: string,
  mutationOptions?: UseMutationOptions<GenerateSignedURLResponse, Error, GenerateSignedURLDto>
) => {
  return useMutation({
    mutationKey: ['createPresignedUrl', footId],
    mutationFn: (body: GenerateSignedURLDto) => getPreSignedURL(footId, body),
    ...mutationOptions
  });
};
