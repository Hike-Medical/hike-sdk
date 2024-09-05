import { toResponseError } from 'errors/ResponseError';
import { backendApi } from '../utils/backendApi';

export const generateRosterUploadlink = async () => {
  try {
    const response = await backendApi.post('roster/upload-link');
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};
