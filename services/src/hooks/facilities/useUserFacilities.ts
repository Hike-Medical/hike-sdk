import { FacilityExtended } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchUserFacilities } from '../../api/facility.service';
import { ResponseError } from '../../errors/ResponseError';

export const useUserFacilities = (
  userId: string,
  options?: Omit<UseQueryOptions<FacilityExtended[], ResponseError<null>>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<FacilityExtended[], ResponseError<null>>({
    queryKey: ['userFacilities', userId],
    queryFn: async () => await fetchUserFacilities(userId),
    ...options
  });
};
