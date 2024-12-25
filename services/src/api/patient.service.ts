import type {
  CompanyUser,
  CreatePatientParams,
  GetPatientsParams,
  PagedParams,
  PagedResponse,
  PatientUserResponse,
  SearchPatientsParams,
  UpdatePatientParams,
  UpsertContactParams
} from '@hike/types';
import { PatientExtended } from '@hike/types';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const createPatient = async (params: CreatePatientParams): Promise<PatientExtended> => {
  try {
    const response = await backendApi.post('patient', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findPatientById = async (patientId: string): Promise<PatientExtended> => {
  try {
    const response = await backendApi.get(`patient/${patientId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findCurrentPatient = async (companyId?: string): Promise<PatientUserResponse> => {
  try {
    const response = await backendApi.get(
      'patient/current',
      companyId
        ? {
            headers: { 'x-company-id': companyId }
          }
        : undefined
    );
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchPatients = async (params?: GetPatientsParams): Promise<PagedResponse<PatientExtended[]>> => {
  try {
    const response = await backendApi.get('patient', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchPatientsByMissingExternalId = async (
  params?: PagedParams
): Promise<PagedResponse<PatientExtended[]>> => {
  try {
    const response = await backendApi.get('patient/external-id', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const searchPatients = async (params: SearchPatientsParams): Promise<PagedResponse<PatientExtended[]>> => {
  try {
    const response = await backendApi.get('patient/search', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const updatePatient = async (patientId: string, params: UpdatePatientParams): Promise<PatientExtended> => {
  try {
    const response = await backendApi.patch(`patient/${patientId}`, params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const upsertContact = async (patientId: string, params: UpsertContactParams): Promise<PatientExtended> => {
  try {
    const response = await backendApi.patch(`patient/${patientId}/contact`, params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const approvePatient = async (patientId: string) => {
  try {
    const response = await backendApi.patch(`patient/${patientId}/approve`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const isPatientApproved = (user: CompanyUser | undefined): boolean => !!user?.role && user.active;
