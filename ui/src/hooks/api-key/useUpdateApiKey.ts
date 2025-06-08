import { updateApiKey } from '@hike/services';
import type { ApiKey, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useUpdateApiKey = (options?: UseMutationOptions<ApiKey, HikeError<null>, string>) =>
  useMutation({
    mutationKey: ['updateApiKey'],
    mutationFn: async (apiKeyId) => await updateApiKey(apiKeyId),
    ...options
  });
