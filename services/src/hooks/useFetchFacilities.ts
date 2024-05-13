import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchCompanyFacilitiesAndAddresses } from '../api/facility.service';
import { Facility, FacilityAddress } from '@hike/types';

export const useFetchFacilities = (options?: UseQueryOptions<Facility & { address: FacilityAddress }[], Error>) => {
  return useQuery({
    queryKey: ['facilities'],
    queryFn: async () => fetchCompanyFacilitiesAndAddresses(),
    ...options
  });
};
