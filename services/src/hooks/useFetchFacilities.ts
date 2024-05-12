import { useQuery } from '@tanstack/react-query';
import { fetchCompanyFacilitiesAndAddresses } from '../api/shipping.service';

export const useFetchFacilities = () => {
  return useQuery({
    queryKey: ['facilities'],
    queryFn: async () => fetchCompanyFacilitiesAndAddresses()
  });
};
