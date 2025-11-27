import { fetchEnrollmentStep } from '@hike/services';
import type { EnrollmentStep, HikeError } from '@hike/types';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

/**
 * Hook to get current enrollment step for the authenticated user
 * Backend derives step from session - no params needed
 *
 * Returns: 'COLLECTING' | 'VERIFYING' | 'COMPLETE'
 */
export const useEnrollmentStep = (
  options?: Omit<UseQueryOptions<EnrollmentStep, HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery<EnrollmentStep, HikeError<null>>({
    queryKey: ['enrollmentStep'],
    queryFn: fetchEnrollmentStep,
    ...options
  });
