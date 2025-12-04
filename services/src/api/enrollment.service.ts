import type { CheckEnrollmentEligibilityResponse, SaveEnrollmentDetailsParams } from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const saveEnrollmentDetails = async (params: SaveEnrollmentDetailsParams): Promise<{ patientId: string }> => {
  try {
    const response = await backendApi.post('/enrollment/details', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const checkEnrollmentEligibility = async (patientId: string): Promise<CheckEnrollmentEligibilityResponse> => {
  try {
    const response = await backendApi.post(`/enrollment/eligibility/${patientId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
