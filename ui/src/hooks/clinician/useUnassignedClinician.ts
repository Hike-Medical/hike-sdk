import { HikeError, fetchUnassignedClinician } from '@hike/services';
import type { Clinician } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseUnassignedClinicianOptions
  extends Omit<UseQueryOptions<Clinician, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params: { clinicianId: string };
  queryKey?: QueryKey;
}

export const useUnassignedClinician = ({ params, queryKey = [], ...options }: UseUnassignedClinicianOptions) =>
  useQuery({
    queryKey: ['unassignedClinician', params, queryKey],
    queryFn: async () => await fetchUnassignedClinician(params.clinicianId),
    ...options
  });
