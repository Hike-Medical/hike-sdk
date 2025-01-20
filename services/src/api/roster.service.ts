import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const uploadRoster = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await backendApi.post('roster', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
