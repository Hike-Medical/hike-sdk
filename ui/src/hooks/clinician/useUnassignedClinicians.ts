import { fetchUnassignedClinicians } from '@hike/services';
import type { Clinician } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseUnassignedCliniciansOptions
  extends Omit<UseQueryOptions<Clinician[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  name: string;
  queryKey?: QueryKey;
}

export const useUnassignedClinicians = ({ name, queryKey = [], ...options }: UseUnassignedCliniciansOptions) =>
  useQuery({
    queryKey: ['unassignedClinicians', name, queryKey],
    queryFn: async () => await fetchUnassignedClinicians(name),
    ...options
  });
