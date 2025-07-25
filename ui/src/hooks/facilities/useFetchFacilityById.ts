import { getFacilityById } from '@hike/services';
import { FacilityExtended, HikeError } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export const useFacilityById = (
  facilityId: string,
  options?: Omit<UseQueryOptions<FacilityExtended, HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['facility', facilityId],
    queryFn: async () => await getFacilityById(facilityId),
    ...options
  });
