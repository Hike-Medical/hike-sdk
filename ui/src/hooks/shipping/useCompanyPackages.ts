import { fetchCompanyPackages } from '@hike/services';
import { useQuery } from '@tanstack/react-query';

export const useCompanyPackageTypes = () =>
  useQuery({
    queryKey: ['companyPackageTypes'],
    queryFn: async () => await fetchCompanyPackages()
  });
