import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { generateRosterUploadlink } from '../../api/roster.service';
import { ResponseError } from 'errors/ResponseError';
import { GenerateUploadLinkOptions } from '@hike/types';

interface GenerateUploadLinkResponse {
  filePath: string;
  uploadUrl: string;
}

export const useGenerateUploadLink = (
  mutationOptions?: UseMutationOptions<GenerateUploadLinkResponse, ResponseError<null>, GenerateUploadLinkOptions>
) => {
  return useMutation({
    mutationKey: ['generateUploadLink'],
    mutationFn: async (body: GenerateUploadLinkOptions) => generateRosterUploadlink(body),
    ...mutationOptions
  });
};
