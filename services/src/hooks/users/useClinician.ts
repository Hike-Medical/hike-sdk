import type { Clinician } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchClinician } from '../../api/user.service';
import { ResponseError } from '../../errors/ResponseError';

export interface UseClinicianOptions
  extends Omit<UseQueryOptions<Clinician | null, ResponseError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useClinician = ({ queryKey = [], ...options }: UseClinicianOptions = {}) =>
  useQuery({
    queryKey: ['clinician', queryKey],
    queryFn: async () => await fetchClinician(),
    ...options
  });
