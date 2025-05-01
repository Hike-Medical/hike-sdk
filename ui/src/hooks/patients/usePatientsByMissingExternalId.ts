import { fetchPatientsByMissingExternalId, HikeError } from '@hike/services';
import type { PagedParams, PagedResponse, PatientExtended } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UsePatientsWithMissingIdsOptions
  extends Omit<UseQueryOptions<PagedResponse<PatientExtended[]>, HikeError<null>>, 'queryKey' | 'queryFn'> {
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
