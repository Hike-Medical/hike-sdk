import { FootStatus } from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const getClinicalFootStatus = async (footId: string): Promise<FootStatus> => {
  try {
    const response = await backendApi.get(`foot/${footId}/clinicalStatus`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
