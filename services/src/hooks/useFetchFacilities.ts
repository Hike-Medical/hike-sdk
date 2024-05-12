import { useQuery } from '@tanstack/react-query';
import { fetchCompanyFacilitiesAndAddresses } from '../api/shipping.service';

export const useGetFacilities = () => {
  return useQuery({
    queryKey: ['facilities'],
    queryFn: async () => fetchCompanyFacilitiesAndAddresses()
  });
};
