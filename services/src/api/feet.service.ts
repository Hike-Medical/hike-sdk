import { FootStatus } from '@hike/types';
import { toResponseError } from '../errors/ResponseError';
import { backendApi } from '../utils/backendApi';

export const getClinicalFootStatus = async (footId: string): Promise<FootStatus> => {
  try {
    const response = await backendApi.get(`foot/${footId}/clinicalStatus`);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};
