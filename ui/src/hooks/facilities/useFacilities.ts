import { fetchCompanyFacilitiesAndAddresses } from '@hike/services';
import { FacilityExtended, HikeError } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export const useFacilities = (
  options?: Omit<UseQueryOptions<FacilityExtended[], HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['facilities'],
    queryFn: async () => await fetchCompanyFacilitiesAndAddresses(),
    ...options
  });
