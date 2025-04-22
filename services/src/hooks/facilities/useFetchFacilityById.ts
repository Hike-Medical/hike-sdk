import { FacilityExtended } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getFacilityById } from '../../api/facility.service';
import { HikeError } from '../../errors/HikeError';

export const useFacilityById = (
  facilityId: string,
  options?: Omit<UseQueryOptions<FacilityExtended, HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['facility', facilityId],
    queryFn: async () => await getFacilityById(facilityId),
    ...options
  });
