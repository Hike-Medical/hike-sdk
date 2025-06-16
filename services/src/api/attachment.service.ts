import {
  CreateAttachmentParams,
  EvaluationAttachmentExtended,
  GetEvaluationAttachmentsParams,
  PagedResponse,
  UpdateAttachmentParams
} from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const createPresignedUrlForAttachment = async (data: CreateAttachmentParams) => {
  try {
    const response = await backendApi.post('attachment/upload-link', data);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const updateAttachment = async (attachmentId: string, data: UpdateAttachmentParams) => {
  try {
    await backendApi.post(`attachment/${attachmentId}`, data);
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchEvaluationAttachments = async (
  params?: GetEvaluationAttachmentsParams
): Promise<PagedResponse<EvaluationAttachmentExtended[]>> => {
  try {
    const response = await backendApi.get('attachment', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
