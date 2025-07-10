import { getAllCompanyFeatureFlags } from '@hike/services';
import { CompanyFeatureFlag, HikeError } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export const useGetAllCompanyFeatureFlags = (options?: UseQueryOptions<CompanyFeatureFlag[], HikeError<null>>) =>
  useQuery({
    queryKey: ['allCompanyFeatureFlags'],
    queryFn: async () => await getAllCompanyFeatureFlags(),
    ...options
  });
