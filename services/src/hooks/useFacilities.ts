import { Facility, FacilityAddress } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchCompanyFacilitiesAndAddresses } from '../api/facility.service';

export const useFacilities = (
  options?: Omit<UseQueryOptions<(Facility & { address: FacilityAddress })[], Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['facilities'],
    queryFn: async () => await fetchCompanyFacilitiesAndAddresses(),
    ...options
  });
};
