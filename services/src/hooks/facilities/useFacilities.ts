import { FacilityExtended } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchCompanyFacilitiesAndAddresses } from '../../api/facility.service';
import { ResponseError } from '../../errors/ResponseError';

export const useFacilities = (
  options?: Omit<UseQueryOptions<FacilityExtended[], ResponseError<null>>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['facilities'],
    queryFn: async () => await fetchCompanyFacilitiesAndAddresses(),
    ...options
  });
};
