import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { GenerateSignedURLDto, getPreSignedURL } from '../api/scan.service';
import { GenerateSignedURLResponse } from '../api/workbench.service';

export const useGetPreSignedURL = (
  footId: string,
  mutationOptions?: UseMutationOptions<GenerateSignedURLResponse, Error, GenerateSignedURLDto>
) => {
  return useMutation({
    mutationKey: ['getPreSignedURL', footId],
    mutationFn: (body: GenerateSignedURLDto) => getPreSignedURL(footId, body),
    ...mutationOptions
  });
};
