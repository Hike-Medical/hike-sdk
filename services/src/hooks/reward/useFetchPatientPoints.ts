'use client';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchPatientPoints } from '../../api/reward.service';
import { HikeError } from '../../errors/HikeError';

export const useFetchPatientPoints = (
  patientId: string,
  queryOptions?: Omit<UseQueryOptions<number, HikeError<null>>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['reward', 'points', patientId],
    queryFn: () => fetchPatientPoints(patientId),
    ...queryOptions
  });
};
