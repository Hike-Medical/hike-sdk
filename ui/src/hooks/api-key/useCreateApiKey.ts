import { createApiKey } from '@hike/services';
import type { ApiKey, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useCreateApiKey = (options?: UseMutationOptions<ApiKey, HikeError<null>>) =>
  useMutation({
    mutationKey: ['createApiKey'],
    mutationFn: async () => await createApiKey(),
    ...options
  });
