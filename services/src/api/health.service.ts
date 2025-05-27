import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const healthCheck = async () => {
  try {
    const response = await backendApi.get('health');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
