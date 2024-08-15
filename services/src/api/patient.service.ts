import type {
  CreatePatientParams,
  PagedParams,
  PagedResponse,
  SearchPatientsParams,
  UpdatePatientParams
} from '@hike/types';
import { PatientExtended } from '@hike/types';
import { toResponseError } from '../errors/ResponseError';
import { backendApi } from '../utils/backendApi';

export const createPatient = async (params: CreatePatientParams): Promise<PatientExtended> => {
  try {
    const response = await backendApi.post('patient', params);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const findPatientById = async (patientId: string): Promise<PatientExtended> => {
  try {
    const response = await backendApi.get(`patient/${patientId}`);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const fetchPatients = async (params?: PagedParams): Promise<PagedResponse<PatientExtended[]>> => {
  try {
    const response = await backendApi.get('patient', { params });
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const fetchPatientsByMissingExternalId = async (
  params?: PagedParams
): Promise<PagedResponse<PatientExtended[]>> => {
  try {
    const response = await backendApi.get('patient/external-id', { params });
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const searchPatients = async (params: SearchPatientsParams): Promise<PagedResponse<PatientExtended[]>> => {
  try {
    const response = await backendApi.get('patient/search', { params });
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const updatePatient = async (patientId: string, params: UpdatePatientParams): Promise<PatientExtended> => {
  try {
    const response = await backendApi.patch(`patient/${patientId}`, params);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};
