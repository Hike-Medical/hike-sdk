import { getAllFeatureFlags } from '@hike/services';
import { FeatureFlag, HikeError } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export const useGetAllFeatureFlags = (options?: UseQueryOptions<FeatureFlag[], HikeError<null>>) =>
  useQuery({
    queryKey: ['allFeatureFlagsForAllCompanies'],
    queryFn: async () => await getAllFeatureFlags(),
    ...options
  });
