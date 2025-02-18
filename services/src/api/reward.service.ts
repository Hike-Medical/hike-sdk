import { RewardInfo } from '@hike/types';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const fetchRewardsForPatient = async (patientId: string): Promise<RewardInfo[]> => {
  try {
    const response = await backendApi.get(`reward/${patientId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchPatientPoints = async (patientId: string): Promise<number> => {
  try {
    const response = await backendApi.get(`reward/${patientId}/points`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
