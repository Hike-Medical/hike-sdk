import type { PagedParams, PagedResponse, PatientExtended } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchPatientsByMissingExternalId } from '../../api/patient.service';
import { ResponseError } from '../../errors/ResponseError';

export interface UsePatientsWithMissingIdsOptions
  extends Omit<UseQueryOptions<PagedResponse<PatientExtended[]>, ResponseError<null>>, 'queryKey' | 'queryFn'> {
  params?: PagedParams;
  queryKey?: QueryKey;
}

export const usePatientsByMissingExternalId = ({
  params,
  queryKey = [],
  ...options
}: UsePatientsWithMissingIdsOptions = {}) =>
  useQuery({
    queryKey: ['patientsByMissingExternalId', params, queryKey],
    queryFn: async () => await fetchPatientsByMissingExternalId(params),
    ...options
  });
