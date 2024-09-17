import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { generateRosterUploadlink } from '../../api/roster.service';
import { GenerateUploadLinkOptions } from '@hike/types';
import { HikeError } from '../../errors/HikeError';

interface GenerateUploadLinkResponse {
  filePath: string;
  uploadUrl: string;
}

export const useGenerateUploadLink = (
  mutationOptions?: UseMutationOptions<GenerateUploadLinkResponse, HikeError<null>, GenerateUploadLinkOptions>
) => {
  return useMutation({
    mutationKey: ['generateUploadLink'],
    mutationFn: async (body: GenerateUploadLinkOptions) => generateRosterUploadlink(body),
    ...mutationOptions
  });
};
