import { FootStatus } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const getClinicalFootStatus = async (footId: string): Promise<FootStatus> => {
  const response = await backendApi.get(`foot/${footId}/clinicalStatus`);
  return response.data;
};
