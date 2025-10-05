import { getAttachmentPresignedUrl } from '@hike/services';
import { useQuery } from '@tanstack/react-query';

export const useAttachmentPresignedUrl = (attachmentId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['attachment-presigned-url', attachmentId],
    queryFn: () => getAttachmentPresignedUrl(attachmentId),
    enabled: !!attachmentId && enabled
  });
};
