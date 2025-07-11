import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export interface GenerateTrialUploadUrlParams {
  fileExtension: 'csv' | 'xlsx' | 'pdf' | 'jpg' | 'jpeg' | 'png' | 'mp4' | 'mov' | 'avi';
  fileName: string;
}

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
