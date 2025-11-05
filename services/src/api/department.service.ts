import { Department } from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const fetchDepartments = async (): Promise<Department[]> => {
  try {
    const response = await backendApi.get('department');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
