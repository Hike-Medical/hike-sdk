import { GenerateTrialUploadUrlParams } from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const generateTrialUploadUrl = async (
  data: GenerateTrialUploadUrlParams
): Promise<{ key: string; presignedUrl: string }> => {
  try {
    const response = await backendApi.post('trial/upload-link', data);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
