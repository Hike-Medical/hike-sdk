import type {
  CompanyUser,
  CreatePatientParams,
  GetPatientsParams,
  PagedParams,
  PagedResponse,
  PatientUserResponse,
  SafeUser,
  SearchPatientsParams,
  UpdatePatientParams,
  UpdateUserParams,
  UpsertContactParams
} from '@hike/types';
import { PatientExtended } from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';
import { findCompanyBySlug } from './company.service';

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

export const findCurrentPatient = async (
  params?: { companyId: string } | { slug: string }
): Promise<PatientUserResponse> => {
  // Handle cases where company not within context
  let companyId = params && 'companyId' in params ? params.companyId : backendApi.defaults.headers['x-company-id'];

  // Get company from provided slug if available
  if (!companyId && params && 'slug' in params) {
    const company = await findCompanyBySlug(params.slug);
    companyId = company.id;
  }

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

export const updatePatientUser = async (patientId: string, params: UpdateUserParams): Promise<SafeUser> => {
  try {
    const response = await backendApi.patch(`patient/${patientId}/user`, params);
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
