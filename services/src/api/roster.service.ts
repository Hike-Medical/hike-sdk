import { GenerateUploadLinkOptions } from '@hike/types';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const generateRosterUploadlink = async (data: GenerateUploadLinkOptions) => {
  try {
    const response = await backendApi.post('roster/upload-link', data);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
