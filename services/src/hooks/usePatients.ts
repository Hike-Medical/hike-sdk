import type { PagedResponse, PatientExtended, SearchPatientsParams } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { fetchPatients, searchPatients } from '../api/patient.service';
import { ResponseError } from '../errors/ResponseError';

export interface UsePatientsOptions extends SearchPatientsParams {
  key?: string[];
  enabled?: boolean;
}

export const usePatients = ({ key = [], enabled = true, ...params }: UsePatientsOptions = { term: '' }) =>
  useQuery<PagedResponse<PatientExtended[]>, ResponseError<null>>({
    queryKey: ['patients', ...key, params],
    queryFn: async () => (params.term !== '' ? await searchPatients(params) : await fetchPatients(params)),
    enabled
  });
