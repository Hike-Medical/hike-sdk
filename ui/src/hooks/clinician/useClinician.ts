import { HikeError, fetchClinician } from '@hike/services';
import type { Clinician } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseClinicianOptions extends Omit<UseQueryOptions<Clinician | null, HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useClinician = ({ queryKey = [], ...options }: UseClinicianOptions = {}) =>
  useQuery({
    queryKey: ['clinician', queryKey],
    queryFn: async () => await fetchClinician(),
    ...options
  });
