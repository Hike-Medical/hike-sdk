import type { PagedResponse, Patient, SearchPatientsParams } from '@hike/types';
import { PatientExtended } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { fetchPatients, findPatientById, searchPatients } from '../api/patient.service';
import { ResponseError } from '../errors/ResponseError';

export interface UsePatientsOptions extends SearchPatientsParams {
  key?: string[];
  enabled?: boolean;
}

export interface UseFindPatientByIdOptions {
  key?: string[];
  enabled?: boolean;
  patientId: string;
}

export const usePatients = ({ key = [], enabled = true, ...params }: UsePatientsOptions = { term: '' }) =>
  useQuery<PagedResponse<Patient[]>, ResponseError<null>>({
    queryKey: ['patients', ...key, params],
    queryFn: async () => (params.term !== '' ? await searchPatients(params) : await fetchPatients(params)),
    enabled
  });

export const usePatientById = ({ key = [], enabled = true, ...params }: UseFindPatientByIdOptions) =>
  useQuery<PatientExtended, ResponseError<null>>({
    queryKey: ['patientsById', ...key, params],
    queryFn: async () => findPatientById(params.patientId),
    enabled
  });
