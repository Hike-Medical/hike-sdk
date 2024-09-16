import { FacilityExtended } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchCompanyFacilitiesAndAddresses } from '../../api/facility.service';
import { HikeError } from '../../errors/HikeError';

export const useFacilities = (
  options?: Omit<UseQueryOptions<FacilityExtended[], HikeError<null>>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['facilities'],
    queryFn: async () => await fetchCompanyFacilitiesAndAddresses(),
    ...options
  });
};
