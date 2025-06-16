import { getAttachmentUrl } from '@hike/services';
import { HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useGetAttachmentUrl = (options?: UseMutationOptions<{ url: string }, HikeError<null>, string>) =>
  useMutation({
    mutationKey: ['getAttachmentUrl'],
    mutationFn: async (attachmentId) => await getAttachmentUrl(attachmentId),
    ...options
  });
