import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const logout = async (): Promise<void> => {
  try {
    const response = await backendApi.post('auth/logout');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
