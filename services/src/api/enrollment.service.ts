import type {
  CheckEnrollmentEligibilityParams,
  CheckEnrollmentEligibilityResponse,
  SaveEnrollmentDetailsParams
} from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const saveEnrollmentDetails = async (params: SaveEnrollmentDetailsParams): Promise<{ patientId: string }> => {
  try {
    const response = await backendApi.post('enrollment/details', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const checkEnrollmentEligibility = async (
  params: CheckEnrollmentEligibilityParams
): Promise<CheckEnrollmentEligibilityResponse> => {
  try {
    const { patientId, externalId, workbenchId } = params;
    const response = await backendApi.post(`enrollment/eligibility/${patientId}`, { externalId, workbenchId });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
