import type { FindPatientBenefitsParams, FindPatientBenefitsResponse } from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const findPatientBenefits = async (params: FindPatientBenefitsParams): Promise<FindPatientBenefitsResponse> => {
  try {
    const { patientId } = params;
    const response = await backendApi.get(`benefit/patient/${patientId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

