import { revokeApiKey } from '@hike/services';
import type { HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useDeleteApiKey = (options?: UseMutationOptions<void, HikeError<null>, string>) =>
  useMutation({
    mutationKey: ['deleteApiKey'],
    mutationFn: async (apiKeyId) => await revokeApiKey(apiKeyId),
    ...options
  });
