import { fetchEvaluationAttachments } from '@hike/services';
import { PagedResponse, EvaluationAttachmentExtended, HikeError, GetEvaluationAttachmentsParams } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useFetchEvaluationAttachments = (
  params: GetEvaluationAttachmentsParams = {},
  options?: UseQueryOptions<
    PagedResponse<EvaluationAttachmentExtended[]>,
    HikeError<null>,
    PagedResponse<EvaluationAttachmentExtended[]>,
    [string, GetEvaluationAttachmentsParams?]
  >
) =>
  useQuery({
    queryKey: ['fetchEvaluationAttachments', options?.queryKey?.[1]],
    queryFn: async () => await fetchEvaluationAttachments(params),
    ...options
  });
