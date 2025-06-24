import { createPresignedUrlForAttachment } from '@hike/services';
import { CreateAttachmentParams, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useCreatePresignedUrlForAttachment = (
  options?: UseMutationOptions<{ presignedUrl: string }, HikeError<null>, CreateAttachmentParams>
) =>
  useMutation({
    mutationKey: ['createPresignedUrlForAttachment'],
    mutationFn: async (params) => await createPresignedUrlForAttachment(params),
    ...options
  });
