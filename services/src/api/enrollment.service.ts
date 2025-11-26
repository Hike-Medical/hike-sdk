import type {
  ConfirmEnrollmentMergeParams,
  CreateEnrollmentPatientParams,
  EnrollmentStatus,
  EnrollmentStatusParams
} from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const fetchEnrollmentStatus = async (params: EnrollmentStatusParams): Promise<EnrollmentStatus> => {
  try {
    const response = await backendApi.get('/enrollment/status', { params });
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

export const confirmEnrollmentMerge = async (params: ConfirmEnrollmentMergeParams): Promise<{ patientId: string }> => {
  try {
    const response = await backendApi.post('/enrollment/merge', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
