import type { PagedResponse, PatientExtended, SearchPatientsParams } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchPatients, searchPatients } from '../../api/patient.service';
import { ResponseError } from '../../errors/ResponseError';

export interface UsePatientsOptions
  extends Omit<UseQueryOptions<PagedResponse<PatientExtended[]>, ResponseError<null>>, 'queryKey' | 'queryFn'> {
  params?: SearchPatientsParams;
  queryKey?: QueryKey;
}

export const usePatients = ({ params, queryKey = [], ...options }: UsePatientsOptions = {}) =>
  useQuery({
    queryKey: ['patients', params, queryKey],
    queryFn: async () => (params?.term ? await searchPatients(params) : await fetchPatients(params)),
    ...options
  });
