import { fetchAppointmentsImportStatus } from '@hike/services';
import type { ImportAppointmentsResponse } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseAppointmentsImportJobOptions
  extends Omit<
    UseQueryOptions<{ progress: number; data?: ImportAppointmentsResponse }, HikeError<null>>,
    'queryKey' | 'queryFn'
  > {
  id: string;
  queryKey?: QueryKey;
}

export const useAppointmentsImportJob = ({ id, queryKey = [], ...options }: UseAppointmentsImportJobOptions) =>
  useQuery({
    queryKey: ['appointmentsImportJob', id, queryKey],
    queryFn: async () => await fetchAppointmentsImportStatus(id),
    ...options
  });
