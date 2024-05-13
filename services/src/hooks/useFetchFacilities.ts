import { useQuery } from '@tanstack/react-query';
import { fetchCompanyFacilitiesAndAddresses } from '../api/facility.service';

export const useFetchFacilities = () => {
  return useQuery({
    queryKey: ['facilities'],
    queryFn: async () => fetchCompanyFacilitiesAndAddresses()
  });
};
