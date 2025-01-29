import type { ImportAppointmentsResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchAppointmentsImportStatus } from '../../api/appointment.service';
import { HikeError } from '../../errors/HikeError';

export interface UseAppointmentsImportJobOptions
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
