'use client';

import { fetchPatientPoints } from '@hike/services';
import { HikeError } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export const useFetchPatientPoints = (
  patientId: string,
  queryOptions?: Omit<UseQueryOptions<number, HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['reward', 'points', patientId],
    queryFn: () => fetchPatientPoints(patientId),
    ...queryOptions
  });
