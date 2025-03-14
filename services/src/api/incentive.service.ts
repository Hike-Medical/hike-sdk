import { Incentive, IncentiveType, PatientIncentive } from '@hike/types';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const findIncentiveByType = async (incentiveType: IncentiveType): Promise<Incentive | null> => {
  try {
    const response = await backendApi.get(`incentive/${incentiveType}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchPatientIncentivesByType = async (incentiveType: IncentiveType): Promise<PatientIncentive[]> => {
  try {
    const response = await backendApi.get(`incentive/${incentiveType}/patients`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
