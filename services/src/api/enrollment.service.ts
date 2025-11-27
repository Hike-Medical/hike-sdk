import type { CreateEnrollmentPatientParams, EnrollmentStep } from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const fetchEnrollmentStep = async (): Promise<EnrollmentStep> => {
  try {
    const response = await backendApi.get('/enrollment/step');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const createEnrollmentPatient = async (
  params: CreateEnrollmentPatientParams
): Promise<{ patientId: string }> => {
  try {
    const response = await backendApi.post('/enrollment/patient', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
