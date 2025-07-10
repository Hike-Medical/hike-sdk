import { addFeatureFlag } from '@hike/services';
import type { AddFeatureFlagParams } from '@hike/types';
import { FeatureFlag, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddFeatureFlag = (options?: UseMutationOptions<FeatureFlag, HikeError<null>, AddFeatureFlagParams>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: AddFeatureFlagParams) => await addFeatureFlag(params),
    onSuccess: () => {
      // Invalidate and refetch feature flag queries
      queryClient.invalidateQueries({ queryKey: ['featureFlag'] });
      queryClient.invalidateQueries({ queryKey: ['companyFeatureFlags'] });
      queryClient.invalidateQueries({ queryKey: ['allFeatureFlags'] });
    },
    ...options
  });
};
