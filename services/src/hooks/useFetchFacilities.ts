import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchCompanyFacilitiesAndAddresses } from '../api/facility.service';
import { Facility, FacilityAddress } from '@hike/types';

export const useFetchFacilities = (
  options?: Omit<UseQueryOptions<(Facility & { address: FacilityAddress })[], Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['facilities'],
    queryFn: async () => fetchCompanyFacilitiesAndAddresses(),
    ...options
  });
};
