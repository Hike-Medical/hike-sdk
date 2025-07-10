import { toggleFeatureFlag } from '@hike/services';
import type { ToggleFeatureFlagParams } from '@hike/types';
import { CompanyFeatureFlag, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';

export const useToggleFeatureFlag = (
  options?: UseMutationOptions<CompanyFeatureFlag, HikeError<null>, ToggleFeatureFlagParams>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: ToggleFeatureFlagParams) => await toggleFeatureFlag(params),
    onSuccess: () => {
      // Invalidate and refetch feature flag queries
      queryClient.invalidateQueries({ queryKey: ['companyFeatureFlags'] });
      queryClient.invalidateQueries({ queryKey: ['featureFlag'] });
      queryClient.invalidateQueries({ queryKey: ['allFeatureFlags'] });
    },
    ...options
  });
};
