import { useQuery } from '@tanstack/react-query';
import { fetchCompanyPackages } from '../../api/shipping.service';

export const useCompanyPackageTypes = () => {
  return useQuery({
    queryKey: ['companyPackageTypes'],
    queryFn: async () => await fetchCompanyPackages()
  });
};
