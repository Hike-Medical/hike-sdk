import { useQuery } from '@tanstack/react-query';
import { getAttachmentPresignedUrl } from '@hike/services';

export const useAttachmentPresignedUrl = (attachmentId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['attachment-presigned-url', attachmentId],
    queryFn: () => getAttachmentPresignedUrl(attachmentId),
    enabled: !!attachmentId && enabled
  });
};
