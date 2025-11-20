import { getEnrollmentStatus } from '@hike/services';
import type { EnrollmentStatus, EnrollmentStatusParams, HikeError } from '@hike/types';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

export const useEnrollmentStatus = (
  params: EnrollmentStatusParams,
  options?: Omit<UseQueryOptions<EnrollmentStatus, HikeError<null>, EnrollmentStatus>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['enrollmentStatus', params],
    queryFn: () => getEnrollmentStatus(params),
    ...options
  });
