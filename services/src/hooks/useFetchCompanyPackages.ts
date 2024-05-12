import { useQuery } from '@tanstack/react-query';
import { fetchCompanyPackages } from '../api/shipping.service';

export const useFetchCompanyPackageTypes = () => {
  return useQuery({
    queryKey: ['companyPackageTypes'],
    queryFn: async () => await fetchCompanyPackages()
  });
};
