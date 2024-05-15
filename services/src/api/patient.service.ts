import type {
  CreatePatientParams,
  PagedParams,
  PagedResponse,
  Patient,
  SearchPatientsParams,
  UpdatePatientParams
} from '@hike/types';
import { PatientExtended } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const createPatient = async (params: CreatePatientParams): Promise<Patient> => {
  const response = await backendApi.post('patient', params);
  return response.data;
};

export const findPatientById = async (patientId: string): Promise<PatientExtended> => {
  const response = await backendApi.get(`patient/${patientId}`);
  return response.data;
};

export const fetchPatients = async (params?: PagedParams): Promise<PagedResponse<Patient[]>> => {
  const response = await backendApi.get('patient', { params });
  return response.data;
};

export const searchPatients = async (params: SearchPatientsParams): Promise<PagedResponse<Patient[]>> => {
  const response = await backendApi.get('patient/search', { params });
  return response.data;
};

export const updatePatient = async (patientId: string, params: UpdatePatientParams): Promise<Patient> => {
  const response = await backendApi.patch(`patient/${patientId}`, params);
  return response.data;
};
